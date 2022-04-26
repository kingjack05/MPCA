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

				const query = `
				mutation MyQ {
					insert_todos(objects: {text: "YoYoMan"}) {
					  affected_rows
					}
				  }
			`
				return {
					query,
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
				deletedFlag: "deleted",
				live: true,
			})

			patientsReplicationState.error$.subscribe((error) => {
				console.log("something was wrong")
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
