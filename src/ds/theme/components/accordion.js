import { accordionAnatomy as parts } from "@chakra-ui/anatomy"

const baseStyleContainer = {
	borderColor: "inherit",
}

const baseStyleButton = {
	transitionProperty: "common",
	transitionDuration: "normal",
	fontSize: "1rem",
	border: "none",
	_focus: {
		boxShadow: "none",
		background: "white",
	},
	_hover: {
		background: "white",
	},
	_disabled: {
		opacity: 0.4,
		cursor: "not-allowed",
	},
	px: 0,
	py: 0,
}

const baseStylePanel = {
	p: 1,
}

const baseStyleIcon = {
	fontSize: "1.25em",
}

const baseStyle = {
	root: {},
	container: baseStyleContainer,
	button: baseStyleButton,
	panel: baseStylePanel,
	icon: baseStyleIcon,
}

const Accordion = {
	parts: parts.keys,
	baseStyle,
}

export default Accordion
