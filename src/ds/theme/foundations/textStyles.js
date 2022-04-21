export const FONT_WEIGHT = {
	BOLD: "bold",
	SEMI: 600,
	NORMAL: "normal",
	LIGHT: 300,
}

const textStyles = {
	bodyShort1: {
		fontSize: "14px",
		fontWeight: FONT_WEIGHT.NORMAL,
		lineHeight: "18px",
		letterSpacing: "0.16px",
	},
	body2: {
		fontSize: ["16px"],
		fontWeight: FONT_WEIGHT.NORMAL,
		lineHeight: ["24px"],
	},
	h2: {
		fontSize: ["16px"],
		fontWeight: FONT_WEIGHT.SEMI,
		lineHeight: ["24px"],
	},
	h3: {
		fontSize: ["14px"],
		fontWeight: FONT_WEIGHT.SEMI,
		lineHeight: ["18px"],
	},
	label1: {
		fontSize: ["12px"],
		fontWeight: FONT_WEIGHT.NORMAL,
		lineHeight: ["16px"],
	},
	label1Semi: {
		fontSize: ["12px"],
		fontWeight: FONT_WEIGHT.SEMI,
		lineHeight: ["16px"],
	},
	tertiaryText: {
		fontSize: ["8px"],
		fontWeight: FONT_WEIGHT.LIGHT,
		lineHeight: ["8px"],
	},
}

export default textStyles
