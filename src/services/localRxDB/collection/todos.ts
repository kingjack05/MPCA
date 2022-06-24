import { getDB } from "../../../db.ts"

export const createTodo = async (data) => {
	const DB = await getDB()
	const query = DB.todos.insert(data)
	const results = await query.exec()
	return results
}
