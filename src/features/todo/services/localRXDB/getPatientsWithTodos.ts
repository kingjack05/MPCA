import { getDB } from "../../../../db"

export const getPatientsWithTodos = async () => {
	const DB = await getDB()
	const patientsWithTodos = await DB.patients
		.find({
			selector: {
				todos: {
					$size: { $gt: 0 },
				},
			},
		})
		.exec()
	return patientsWithTodos
}
