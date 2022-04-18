import { useEffect, useRef, useState } from "react"

import { getDB } from "../db"

export const usePatient = ({ id }) => {
	const [patient, setPatient] = useState()
	const dbref = useRef()
	const subref = useRef()

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
			})
			return () => subref.current.unsubscribe()
		}
		fetchData()
	}, [id])

	return { patient }
}
