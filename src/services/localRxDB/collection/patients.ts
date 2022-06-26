import { getDB } from "../../../db"

export const readPatientTodos = async (patientID) => {
	const DB = await getDB()
	const patient = await DB.patients
		.findOne({
			selector: { _id: patientID },
		})
		.exec()
	return patient.todos
}
