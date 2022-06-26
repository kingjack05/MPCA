import {
	toTypedRxJsonSchema,
	ExtractDocumentTypeFromTypedRxJsonSchema,
	RxJsonSchema,
	RxCollection,
	RxDatabase,
	RxDocument,
} from "rxdb"

export const patientSchemaLiteral = {
	title: "patients",
	description: "patients data",
	version: 0,
	primaryKey: "_id",
	type: "object",
	properties: {
		_id: { type: "string" },
		name: { type: "string" },
		age: { type: "number" },
		gender: { type: "string" },
		height: { type: "string" },
		weight: { type: "string" },
		summary: { type: "string" },
		extraInfo: { type: "object" },
		todos: {
			type: "array",
			default: [],
			items: {
				type: "object",
				properties: {
					_id: { type: "string" },
					title: { type: "string" },
					done: { type: "boolean" },
					annotation: { type: "object" },
				},
			},
		},
		problems: {
			type: "array",
			default: [],
			uniqueItems: true,
			items: {
				type: "object",
				properties: {
					problem: { type: "string" },
					status: { type: "string" },
					goal: { type: "string" },
					info: {
						type: "array",
						items: {
							type: "object",
							properties: {
								category: { type: "string" },
								content: { type: "object" },
							},
						},
					},
				},
			},
		},
		logs: {
			type: "array",
			default: [],
			items: {
				type: "object",
				properties: {
					summary: { type: "string" },
					detailed: { type: "string" },
					date: { type: "number" },
				},
			},
		},
		meds: {
			type: "array",
			default: [],
			items: {
				type: "object",
				properties: {
					name: { type: "string" },
					strength: { type: "string" },
					dosage: { type: "string" },
					form: { type: "string" },
					date: { type: "number" },
				},
			},
		},
		labs: {
			type: "array",
			default: [],
			items: {
				type: "object",
				properties: {
					name: { type: "string" },
					value: { type: "number" },
					unit: { type: "string" },
					date: { type: "number" },
					min: { type: "number" },
					max: { type: "number" },
				},
			},
		},
		createdAt: {
			type: "string",
			format: "date-time",
		},
		updated_at: {
			type: "string",
			format: "date-time",
		},
	},
	required: ["name"],
	indexes: ["name", "updated_at"],
} as const
const patientTypedRxJsonSchema = toTypedRxJsonSchema(patientSchemaLiteral)
export type PatientDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
	typeof patientTypedRxJsonSchema
>
export type PatientRxDBDocType = RxDocument<PatientDocType>
export const patientSchema: RxJsonSchema<PatientDocType> = patientSchemaLiteral
export type PatientCollection = RxCollection<PatientDocType>

export const templateSchema = {
	title: "templates",
	description: "problem template",
	version: 0,
	primaryKey: "_id",
	type: "object",
	properties: {
		_id: { type: "string" },
		problem: { type: "string" },
		status: { type: "string" },
		goal: { type: "string" },
		info: {
			type: "array",
			items: {
				type: "object",
				properties: {
					category: { type: "string" },
					content: { type: "object" },
				},
			},
		},
		updated_at: {
			type: "string",
			format: "date-time",
		},
	},
}

export const logSchema = {
	title: "logs",
	description: "log data",
	version: 0,
	primaryKey: "_id",
	type: "object",
	properties: {
		_id: { type: "string" },
		summary: { type: "string" },
		detailed: { type: "string" },
		updated_at: {
			type: "string",
			format: "date-time",
		},
	},
}

/**
 * @typedef Workup
 * @property {string} _id
 * @property {string} name Workup name
 * @property {{}} generalComments Comments in Tiptap JSON format
 * @property {Question[]} questions
 *
 * @typedef Question
 * @property {string} question Content of the question
 * @property {QuestionCategory} category
 * @property {{}} annotation
 *
 * @typedef {"Text" | "Yes/No" | "Single Select" | "Multiple Select"} QuestionCategory
 */

export const workupSchemaLiteral = {
	title: "workups",
	description: "workup data",
	version: 0,
	primaryKey: "_id",
	type: "object",
	properties: {
		_id: { type: "string" },
		name: { type: "string" },
		generalComments: { type: "object" },
		questions: {
			type: "array",
			default: [],
			items: {
				type: "object",
				properties: {
					question: { type: "string" },
					category: { type: "string" },
					annotation: { type: "object" },
				},
			},
		},
		updated_at: {
			type: "string",
			format: "date-time",
		},
	},
} as const
const workupTypedRxJsonSchema = toTypedRxJsonSchema(workupSchemaLiteral)
type WorkupDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof workupTypedRxJsonSchema>
export const workupSchema: RxJsonSchema<WorkupDocType> = workupSchemaLiteral
export type WorkupCollection = RxCollection<WorkupDocType>

export const medsSchemaLiteral = {
	title: "meds",
	description: "meds data",
	version: 0,
	primaryKey: "_id",
	type: "object",
	properties: {
		_id: { type: "string" },
		name: { type: "string" },
		strength: { type: "string" },
		usage: { type: "string" },
		form: { type: "string" },
		medClass: { type: "string" },
		indications: { type: "array", items: { type: "string" } },
		otherInfo: { type: "object" },
		updated_at: {
			type: "string",
			format: "date-time",
		},
	},
} as const
const medsTypedRxJsonSchema = toTypedRxJsonSchema(medsSchemaLiteral)
type MedDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof medsTypedRxJsonSchema>
export const medsSchema: RxJsonSchema<MedDocType> = medsSchemaLiteral
export type MedsCollection = RxCollection<MedDocType>

export const labsSchema = {
	title: "labs",
	description: "labs data",
	version: 0,
	primaryKey: "_id",
	type: "object",
	properties: {
		_id: { type: "string" },
		name: { type: "string" },
		unit: { type: "string" },
		min: { type: "number" },
		max: { type: "number" },
		conversionEquivalence: { type: "number" },
		updated_at: {
			type: "string",
			format: "date-time",
		},
	},
}

export const imagesSchema = {
	title: "images",
	description: "images data",
	version: 0,
	primaryKey: "_id",
	type: "object",
	properties: {
		_id: { type: "string" },
		name: { type: "string" },
		summary: { type: "string" },
		updated_at: {
			type: "string",
			format: "date-time",
		},
	},
}

export type DBCollections = {
	patients: PatientCollection
	workups: WorkupCollection
	meds: MedsCollection
}

export type DB = RxDatabase<DBCollections>
