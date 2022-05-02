import { createContext, useContext, useEffect, useState } from "react"
import { getDB } from "../../../db"
import { useAuth0 } from "@auth0/auth0-react"
const Context = createContext()

export const DBContext = ({ children }) => {
	const [DB, setDB] = useState()
	const [JWT, setJWT] = useState("")
	const { getAccessTokenSilently, isAuthenticated } = useAuth0()

	useEffect(() => {
		const fetchToken = async () => {
			if (isAuthenticated) {
				const token = await getAccessTokenSilently({
					audience: "kingjack05@gmail.com",
				})
				setJWT(token)
				console.log(token)
			}
		}
		fetchToken()
	}, [isAuthenticated, getAccessTokenSilently])

	useEffect(() => {
		const loadDB = async () => {
			const db = await getDB()
			setDB(db)

			if (!JWT) {
				return
			}

			const patientsPushQueryBuilder = (doc) => {
				console.log(doc)
				const { _id, name, problems, logs, meds, labs, _deleted } = doc
				const data = { problems, logs, meds, labs }
				const query = /* GraphQL */ `
				mutation pushPatient ($data: jsonb) {
					delete_user_patient(where: {patient_id: {_eq: "${_id}"}}) {
						affected_rows
					}
					insert_patients(
						objects: {_id: "${_id}", name: "${name}", data: $data, taken_care_by:{data:{}}, deleted: "${_deleted}"}, 
						on_conflict: {constraint: patients_pkey, update_columns: [name, data, updated_at, deleted]}) {
							affected_rows
					  }
				  }
			`
				const variables = { data }
				return {
					query,
					variables,
				}
			}

			const patientsPullQueryBuilder = (doc) => {
				if (!doc) {
					doc = {
						_id: "",
						updated_at: new Date(0).toUTCString(),
					}
				}
				const { updated_at } = doc
				const query = /* GraphQL */ `{
					patients(where: {updated_at: {_gt: "${updated_at}"}}, 
					         order_by: [{updated_at: asc}, {_id: asc}]) {
					  _id
					  data
					  name
					  updated_at
					  deleted
					}
				  }`
				return {
					query,
				}
			}

			const patientsPullModifier = (doc) => {
				const { _id, name, data, updated_at, deleted } = doc
				const { problems, logs, meds, labs } = data
				return {
					_id,
					name,
					problems,
					logs,
					meds,
					labs,
					updated_at,
					deleted,
				}
			}

			const patientsReplicationState = db.patients.syncGraphQL({
				url: "https://blessed-ghoul-34.hasura.app/v1/graphql",
				headers: {
					Authorization: `Bearer ${JWT}`,
				},
				push: {
					queryBuilder: patientsPushQueryBuilder,
					batchSize: 5,
					modifier: (d) => d,
				},
				pull: {
					queryBuilder: patientsPullQueryBuilder,
					batchSize: 5,
					modifier: patientsPullModifier,
				},
				deletedFlag: "deleted",
				live: true,
			})

			patientsReplicationState.error$.subscribe((error) => {
				console.dir(error)
			})
		}
		loadDB()
	}, [JWT])

	return <Context.Provider value={{ DB }}>{children}</Context.Provider>
}

export const useDB = () => {
	return useContext(Context)
}
