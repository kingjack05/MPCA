import { createRxDatabase } from "rxdb"
import { getRxStorageLoki } from "rxdb/plugins/lokijs"
import * as idb from "lokijs/src/incremental-indexeddb-adapter"
import { patientSchema, templateSchema, workupSchema, medsSchema, labsSchema } from "./schema"

let dbPromise = null

const _create = async () => {
	// Create DB
	console.log("DatabaseService: creating database..")
	const db = await createRxDatabase({
		name: "mydatabase",
		storage: getRxStorageLoki({
			adapter: new idb(),
		}),
	})
	console.log("DatabaseService: created database")
	window["db"] = db // write to window for debugging

	// Create Collection
	console.log("DatabaseService: create collections")
	await db.addCollections({
		patients: {
			schema: patientSchema,
		},
		templates: { schema: templateSchema },
		workups: {
			schema: workupSchema,
		},
		meds: {
			schema: medsSchema,
		},
		labs: {
			schema: labsSchema,
		},
	})

	return db
}

export const getDB = () => {
	if (!dbPromise) dbPromise = _create()
	return dbPromise
}
