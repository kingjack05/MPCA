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
	DBCollections,
	DB,
} from "./schema.ts"
import { RxDBReplicationGraphQLPlugin } from "rxdb/plugins/replication-graphql"

addRxPlugin(RxDBReplicationGraphQLPlugin)

type DBPlaceholder = null | Promise<DB>
let dbPromise: DBPlaceholder = null

const _create = async () => {
	// Create DB
	const db = await createRxDatabase<DBCollections>({
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
