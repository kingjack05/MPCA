import { createRxDatabase, addRxPlugin } from "rxdb"
import { getRxStorageLoki } from "rxdb/plugins/lokijs"
import * as idb from "lokijs/src/incremental-indexeddb-adapter"
import {
	patientSchema,
	templateSchema,
	workupSchema,
	medsSchema,
	labsSchema,
	logSchema,
	imagesSchema,
} from "./schema"
import { RxDBReplicationGraphQLPlugin } from "rxdb/plugins/replication-graphql"

addRxPlugin(RxDBReplicationGraphQLPlugin)

let dbPromise = null

const _create = async () => {
	// Create DB
	const db = await createRxDatabase({
		name: "mydatabase",
		storage: getRxStorageLoki({
			adapter: new idb(),
		}),
	})
	window["db"] = db // write to window for debugging

	// Create Collection
	await db.addCollections({
		patients: { schema: patientSchema },
		templates: { schema: templateSchema },
		logs: { schema: logSchema },
		workups: { schema: workupSchema },
		meds: { schema: medsSchema },
		labs: { schema: labsSchema },
		images: { schema: imagesSchema },
	})

	return db
}

export const getDB = () => {
	if (!dbPromise) dbPromise = _create()
	return dbPromise
}
