import { menuAnatomy as parts } from "@chakra-ui/anatomy"
import { mode } from "@chakra-ui/theme-tools"

const baseStyleList = (props) => {
	return {
		bg: "mainTheme",
		boxShadow: mode("sm", "dark-lg")(props),
		py: "0",
		minW: "200px",
		zIndex: 1,
		borderRadius: "none",
	}
}

const baseStyleItem = (props) => {
	return {
		h: "6",
		px: "2",
		border: "none",
		transitionProperty: "background",
		transitionDuration: "ultra-fast",
		transitionTimingFunction: "ease-in",
		bg: "transparent",
		color: "gray.300",
		textStyle: "bodyShort1",
		_hover: {
			color: "gray.100",
			bg: "gray.1000hover",
		},
		_focus: {
			color: "gray.100",
			bg: "gray.800",
		},
		_active: {
			color: "gray.100",
			bg: "gray.700",
		},
		_expanded: {
			bg: mode("gray.100", "whiteAlpha.100")(props),
		},
		_disabled: {
			opacity: 0.4,
			cursor: "not-allowed",
		},
	}
}

const baseStyleGroupTitle = {
	mx: 4,
	my: 2,
	fontWeight: "semibold",
	fontSize: "sm",
}

const baseStyleCommand = {
	opacity: 0.6,
}

const baseStyleDivider = {
	border: 0,
	borderBottom: "1px solid",
	borderColor: "inherit",
	my: "0.5rem",
	opacity: 0.6,
}

const baseStyleButton = {
	transitionProperty: "common",
	transitionDuration: "normal",
}

const baseStyle = (props) => ({
	button: baseStyleButton,
	list: baseStyleList(props),
	item: baseStyleItem(props),
	groupTitle: baseStyleGroupTitle,
	command: baseStyleCommand,
	divider: baseStyleDivider,
})

const menu = {
	parts: parts.keys,
	baseStyle,
}

export default menu
