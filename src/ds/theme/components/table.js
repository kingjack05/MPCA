import { tableAnatomy as parts } from "@chakra-ui/anatomy"

import { mode } from "@chakra-ui/theme-tools"

const baseStyle = {
	table: {
		fontVariantNumeric: "lining-nums tabular-nums",
		borderCollapse: "collapse",
		width: "full",
	},
	th: {
		textAlign: "start",
	},
	td: {
		textAlign: "start",
	},
	caption: {
		mt: 4,
		fontFamily: "heading",
		textAlign: "center",
		fontWeight: "medium",
	},
}

const numericStyles = {
	"&[data-is-numeric=true]": {
		textAlign: "end",
	},
}

const variantSimple = (props) => {
	const { colorScheme: c } = props

	return {
		th: {
			color: mode("gray.600", "gray.400")(props),
			borderBottom: "1px",
			borderColor: mode(`${c}.100`, `${c}.700`)(props),
			...numericStyles,
		},
		td: {
			borderBottom: "1px",
			borderColor: mode(`${c}.100`, `${c}.700`)(props),
			...numericStyles,
		},
		caption: {
			color: mode("gray.600", "gray.100")(props),
		},
		tfoot: {
			tr: {
				"&:last-of-type": {
					th: { borderBottomWidth: 0 },
				},
			},
		},
	}
}

const variantStripe = (props) => {
	const { colorScheme: c } = props

	return {
		th: {
			color: mode("gray.600", "gray.400")(props),
			borderBottom: "1px",
			borderColor: mode(`${c}.100`, `${c}.700`)(props),
			...numericStyles,
		},
		td: {
			borderBottom: "1px",
			borderColor: mode(`${c}.100`, `${c}.700`)(props),
			...numericStyles,
		},
		caption: {
			color: mode("gray.600", "gray.100")(props),
		},
		tbody: {
			tr: {
				"&:nth-of-type(odd)": {
					"th, td": {
						borderBottomWidth: "1px",
						borderColor: mode(`${c}.100`, `${c}.700`)(props),
					},
					td: {
						background: mode(`${c}.100`, `${c}.700`)(props),
					},
				},
			},
		},
		tfoot: {
			tr: {
				"&:last-of-type": {
					th: { borderBottomWidth: 0 },
				},
			},
		},
	}
}

const variantCarbon = {
	table: {
		background: "ui01",
	},
	th: {
		background: "ui03",
		fontFamily: "IBM Plex Sans, sans-serif",
		textTransform: "unset",
		fontSize: ["14px"],
		fontWeight: 600,
		lineHeight: ["18px"],
		py: "0",
		px: "2",
		h: "6",
	},
	td: {
		fontSize: "14px",
		fontWeight: 400,
		lineHeight: "18px",
		letterSpacing: "0.16px",
		py: "0",
		px: "2",
		h: "6",
	},
	tr: {
		_hover: {
			background: "ui03",
		},
	},
}

const variantUnstyled = {
	table: {
		tableLayout: "auto",
	},
	th: {
		flex: "0",
		m: "0",
		p: "0",
		textAlign: "start",
		textTransform: "unset",
	},
	td: {
		flex: "0",
		m: "0",
		p: "0",
		textAlign: "start",
	},
}

const variants = {
	carbon: variantCarbon,
	simple: variantSimple,
	striped: variantStripe,
	unstyled: variantUnstyled,
}

const sizes = {
	sm: {
		th: {
			px: "4",
			py: "1",
			lineHeight: "4",
			fontSize: "xs",
		},
		td: {
			px: "4",
			py: "2",
			fontSize: "sm",
			lineHeight: "4",
		},
		caption: {
			px: "4",
			py: "2",
			fontSize: "xs",
		},
	},
	md: {
		th: {
			px: "6",
			py: "3",
			lineHeight: "4",
			fontSize: "xs",
		},
		td: {
			px: "6",
			py: "4",
			lineHeight: "5",
		},
		caption: {
			px: "6",
			py: "2",
			fontSize: "sm",
		},
	},
	lg: {
		th: {
			px: "8",
			py: "4",
			lineHeight: "5",
			fontSize: "sm",
		},
		td: {
			px: "8",
			py: "5",
			lineHeight: "6",
		},
		caption: {
			px: "6",
			py: "2",
			fontSize: "md",
		},
	},
}

const defaultProps = {
	variant: "simple",
	size: "md",
	colorScheme: "gray",
}

const table = {
	parts: parts.keys,
	baseStyle,
	variants,
	sizes,
	defaultProps,
}

export default table
