import { v4 as uuid } from "uuid"
import { getDB } from "../../../db.ts"

export const upsertWorkup = async (data) => {
	const DB = await getDB()
	const dataCopied = { ...data } // data may be protected by Object.preventExtensions() (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cant_define_property_object_not_extensible)
	delete dataCopied.time
	if (!dataCopied._id) {
		dataCopied._id = uuid()
	}
	const results = await DB.workups.upsert(dataCopied)
	// console.log(results)
	return results
}
