import { useEffect, useRef, useState } from "react"

import { getDB } from "../db"
import { DB, PatientRxDBDocType } from "../schema"

export const usePatient = ({ id }) => {
	const [patient, setPatient] = useState<undefined | PatientRxDBDocType>()
	const dbref = useRef<undefined | DB>()
	const subref = useRef<any>()

	useEffect(() => {
		const fetchData = async () => {
			dbref.current = await getDB()
			const patientQuery = dbref.current.patients.findOne({
				selector: { _id: id },
			})
			const patientInit = await patientQuery.exec()
			setPatient(patientInit)
			subref.current = patientQuery.$.subscribe((patient) => {
				if (!patient) {
					return
				}
				setPatient(patient)
				console.log("updated patient data")
			})
			return () => subref.current.unsubscribe()
		}
		fetchData()
	}, [id])

	return { patient }
}
