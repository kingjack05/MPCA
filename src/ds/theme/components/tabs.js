import { getColor, mode } from "@chakra-ui/theme-tools"

import { tabsAnatomy as parts } from "@chakra-ui/anatomy"

const baseStyleRoot = (props) => {
	const { orientation } = props
	return {
		display: orientation === "vertical" ? "flex" : "block",
	}
}

const baseStyleTab = (props) => {
	const { isFitted } = props

	return {
		bg: "gray.100",
		flex: isFitted ? 1 : undefined,
		border: "none",
		transitionProperty: "common",
		transitionDuration: "normal",
		_focus: {
			zIndex: 1,
			boxShadow: "none",
		},
	}
}

const baseStyleTablist = (props) => {
	const { align = "start", orientation } = props

	const alignments = {
		end: "flex-end",
		center: "center",
		start: "flex-start",
	}

	return {
		bg: "gray.100",
		justifyContent: alignments[align],
		flexDirection: orientation === "vertical" ? "column" : "row",
	}
}

const baseStyleTabpanel = {
	p: 2,
}

const baseStyle = (props) => ({
	root: baseStyleRoot(props),
	tab: baseStyleTab(props),
	tablist: baseStyleTablist(props),
	tabpanel: baseStyleTabpanel,
})

const sizes = {
	sm: {
		tab: {
			w: "11",
			h: "4",
			fontSize: "12px",
		},
	},
	md: {
		tab: {
			fontSize: "24px",
			py: 2,
			px: 4,
		},
	},
	lg: {
		tab: {
			fontSize: "lg",
			py: 3,
			px: 4,
		},
	},
}

const variantLine = (props) => {
	const { colorScheme: c, orientation } = props
	const isVertical = orientation === "vertical"
	const borderProp = orientation === "vertical" ? "borderStart" : "borderBottom"
	const marginProp = isVertical ? "marginStart" : "marginBottom"

	return {
		tablist: {
			[borderProp]: "2px solid",
			borderColor: "transparent",
		},
		tab: {
			[borderProp]: "2px solid",
			borderColor: "transparent",
			[marginProp]: "-2px",
			_selected: {
				color: mode(`${c}.600`, `${c}.300`)(props),
				borderColor: "currentColor",
				textStyle: "label1Semi",
			},
			_active: {},
			_disabled: {
				opacity: 0.4,
				cursor: "not-allowed",
			},
		},
	}
}

const variantEnclosed = (props) => {
	const { colorScheme: c } = props
	return {
		tab: {
			borderTopRadius: "md",
			border: "1px solid",
			borderColor: "transparent",
			mb: "-1px",
			_selected: {
				color: mode(`${c}.600`, `${c}.300`)(props),
				borderColor: "inherit",
				borderBottomColor: mode(`white`, `gray.800`)(props),
			},
		},
		tablist: {
			mb: "-1px",
			borderBottom: "1px solid",
			borderColor: "inherit",
		},
	}
}

const variantEnclosedColored = (props) => {
	const { colorScheme: c } = props
	return {
		tab: {
			border: "1px solid",
			borderColor: "inherit",
			bg: mode(`gray.50`, `whiteAlpha.50`)(props),
			mb: "-1px",
			_notLast: {
				marginEnd: "-1px",
			},
			_selected: {
				bg: mode("#fff", "gray.800")(props),
				color: mode(`${c}.600`, `${c}.300`)(props),
				borderColor: "inherit",
				borderTopColor: "currentColor",
				borderBottomColor: "transparent",
			},
		},
		tablist: {
			mb: "-1px",
			borderBottom: "1px solid",
			borderColor: "inherit",
		},
	}
}

const variantSoftRounded = (props) => {
	const { colorScheme: c, theme } = props
	return {
		tab: {
			borderRadius: "full",
			fontWeight: "semibold",
			color: "gray.600",
			_selected: {
				color: getColor(theme, `${c}.700`),
				bg: getColor(theme, `${c}.100`),
			},
		},
	}
}

const variantSolidRounded = (props) => {
	const { colorScheme: c } = props
	return {
		tab: {
			borderRadius: "full",
			fontWeight: "semibold",
			color: mode("gray.600", "inherit")(props),
			_selected: {
				color: mode(`#fff`, "gray.800")(props),
				bg: mode(`${c}.600`, `${c}.300`)(props),
			},
		},
	}
}

const variantUnstyled = {
	unstyled: {
		paddingY: "8",
		tab: {
			_selected: {
				color: "white",
				boxShadow: "none",
			},
		},
	},
}

const variants = {
	line: variantLine,
	enclosed: variantEnclosed,
	"enclosed-colored": variantEnclosedColored,
	"soft-rounded": variantSoftRounded,
	"solid-rounded": variantSolidRounded,
	unstyled: variantUnstyled,
}

const defaultProps = {
	size: "sm",
	variant: "line",
	colorScheme: "blue",
}

const Tabs = {
	parts: parts.keys,
	baseStyle,
	sizes,
	variants,
	defaultProps,
}

export default Tabs
