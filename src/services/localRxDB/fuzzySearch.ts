import { getDB } from "../../db.ts"

export const medFuzzySearch = async (searchTerm) => {
	const DB = await getDB()
	const value = searchTerm
	if (value.length < 1) return []
	const regexp = new RegExp(`\\b${value}`, "i")
	const selector = {
		$or: [
			{ name: { $regex: regexp } },
			{ medClass: { $eq: searchTerm } },
			{ indications: { $contains: searchTerm } },
			// {indications: {$elemMatch: searchTerm}} works but {indications: {$elemMatch: {$eq: searchTerm}}} doesn't seem to work for some reason...
		],
	}
	const query = DB.meds.find({ selector }).limit(5)
	const results = await query.exec()
	// console.log(results)
	return results
}
