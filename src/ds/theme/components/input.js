import { getColor, mode } from "@chakra-ui/theme-tools"

import { inputAnatomy as parts } from "@chakra-ui/anatomy"

const baseStyle = {
	field: {
		width: "100%",
		minWidth: 0,
		outline: 0,
		position: "relative",
		appearance: "none",
		transitionProperty: "common",
		transitionDuration: "normal",
	},
}

const size = {
	lg: {
		fontSize: "lg",
		px: 4,
		h: 12,
		borderRadius: "md",
	},

	md: {
		fontSize: "16px",
		px: 2,
		h: 6,
		borderRadius: "none",
	},

	sm: {
		fontSize: "sm",
		px: 3,
		h: 8,
		borderRadius: "sm",
	},

	xs: {
		fontSize: "xs",
		px: 2,
		h: 6,
		borderRadius: "sm",
	},
}

const sizes = {
	lg: {
		field: size.lg,
		addon: size.lg,
	},
	md: {
		field: size.md,
		addon: size.md,
	},
	sm: {
		field: size.sm,
		addon: size.sm,
	},
	xs: {
		field: size.xs,
		addon: size.xs,
	},
}

function getDefaults(props) {
	const { focusBorderColor: fc, errorBorderColor: ec } = props
	return {
		focusBorderColor: fc || mode("blue.500", "blue.300")(props),
		errorBorderColor: ec || mode("red.500", "red.300")(props),
	}
}

const variantOutline = (props) => {
	const { theme } = props
	const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

	return {
		field: {
			border: "1px solid",
			borderColor: "inherit",
			bg: "inherit",
			_hover: {
				borderColor: mode("gray.300", "whiteAlpha.400")(props),
			},
			_readOnly: {
				boxShadow: "none !important",
				userSelect: "all",
			},
			_disabled: {
				opacity: 0.4,
				cursor: "not-allowed",
			},
			_invalid: {
				borderColor: getColor(theme, ec),
				boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
			},
			_focus: {
				zIndex: 1,
				borderColor: getColor(theme, fc),
				boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
			},
		},
		addon: {
			border: "1px solid",
			borderColor: mode("inherit", "whiteAlpha.50")(props),
			bg: mode("gray.100", "whiteAlpha.300")(props),
		},
	}
}

const variantFilled = (props) => {
	const { theme } = props
	const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

	return {
		field: {
			border: "2px solid",
			borderColor: "transparent",
			bg: mode("gray.100", "whiteAlpha.50")(props),
			_hover: {
				bg: mode("gray.200", "whiteAlpha.100")(props),
			},
			_readOnly: {
				boxShadow: "none !important",
				userSelect: "all",
			},
			_disabled: {
				opacity: 0.4,
				cursor: "not-allowed",
			},
			_invalid: {
				borderColor: getColor(theme, ec),
			},
			_focus: {
				bg: "transparent",
				borderColor: getColor(theme, fc),
			},
		},
		addon: {
			border: "2px solid",
			borderColor: "transparent",
			bg: mode("gray.100", "whiteAlpha.50")(props),
		},
	}
}

const variantFlushed = (props) => {
	const { theme } = props
	const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

	return {
		field: {
			borderBottom: "1px solid",
			borderColor: "inherit",
			borderRadius: 0,
			px: 0,
			bg: "transparent",
			_readOnly: {
				boxShadow: "none !important",
				userSelect: "all",
			},
			_invalid: {
				borderColor: getColor(theme, ec),
				boxShadow: `0px 1px 0px 0px ${getColor(theme, ec)}`,
			},
			_focus: {
				borderColor: getColor(theme, fc),
				boxShadow: `0px 1px 0px 0px ${getColor(theme, fc)}`,
			},
		},
		addon: {
			borderBottom: "2px solid",
			borderColor: "inherit",
			borderRadius: 0,
			px: 0,
			bg: "transparent",
		},
	}
}

const variantUnstyled = {
	field: {
		bg: "transparent",
		border: "none",
		px: 0,
		height: "auto",
	},
	addon: {
		bg: "transparent",
		px: 0,
		height: "auto",
	},
}

const variantCarbon = {
	field: {
		bg: "field01",
		px: 2,
		height: "5",
		border: "none",
		borderBottom: "input",
		textStyle: "bodyshort1",
		_focus: {
			borderBottom: "1px solid transparent",
			outlineWidth: "1px",
			outlineStyle: "solid",
			outlineColor: "interactive01",
		},
	},
}

const variants = {
	outline: variantOutline,
	filled: variantFilled,
	flushed: variantFlushed,
	unstyled: variantUnstyled,
	carbon: variantCarbon,
}

const defaultProps = {
	size: "md",
	variant: "carbon",
}

const Input = {
	parts: parts.keys,
	baseStyle,
	sizes,
	variants,
	defaultProps,
}

export default Input
