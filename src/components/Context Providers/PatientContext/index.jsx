import { createContext, useContext } from "react"

import { usePatient } from "../../../queries/usePatient"

const Context = createContext()

export const PatientContext = ({ id, children }) => {
	const patient = usePatient({ id })
	return <Context.Provider value={patient}>{children}</Context.Provider>
}

export const usePatientContext = () => {
	return useContext(Context)
}
