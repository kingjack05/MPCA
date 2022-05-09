export const patientSchema = {
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
		summary: { type: "string" },
		extraInfo: { type: "object" },
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
	additionalProperties: true,
}

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
 * @property {Question[]} questions
 *
 * @typedef Question
 * @property {string} question Content of the question
 * @property {QuestionCategory} category
 * @property {{}} annotation
 *
 * @typedef {"Text" | "Yes/No" | "Single Select" | "Multiple Select"} QuestionCategory
 */

export const workupSchema = {
	title: "workups",
	description: "workup data",
	version: 0,
	primaryKey: "_id",
	type: "object",
	properties: {
		_id: { type: "string" },
		name: { type: "string" },
		questions: {
			type: "array",
			default: [],
			items: {
				type: "object",
				properties: {
					question: { type: "string" },
					category: { type: "string" },
				},
			},
		},
		updated_at: {
			type: "string",
			format: "date-time",
		},
	},
}

export const medsSchema = {
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
		updated_at: {
			type: "string",
			format: "date-time",
		},
	},
}

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
