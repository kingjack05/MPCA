import { mode } from "@chakra-ui/theme-tools"
import { drawerAnatomy as parts } from "@chakra-ui/anatomy"

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value) {
	if (value === "full") {
		return {
			dialog: { maxW: "100vw", h: "100vh" },
		}
	}
	return {
		dialog: { maxW: value },
	}
}

const baseStyleOverlay = {
	bg: "blackAlpha.600",
	zIndex: "overlay",
}

const baseStyleDialogContainer = {
	display: "flex",
	zIndex: "modal",
	justifyContent: "center",
}

const baseStyleDialog = (props) => {
	const { isFullHeight } = props

	return {
		...(isFullHeight && { height: "100vh" }),
		zIndex: "modal",
		maxH: "100vh",
		bg: mode("white", "gray.700")(props),
		color: "inherit",
		boxShadow: mode("lg", "dark-lg")(props),
	}
}

const baseStyleHeader = {
	px: 3,
	py: 2,
	fontSize: ["16px"],
	fontWeight: 600,
}

const baseStyleCloseButton = {
	position: "absolute",
	top: 1,
	insetEnd: 2,
	border: "none",
	background: "inherit",
}

const baseStyleBody = {
	px: 0,
	py: 0,
	flex: 1,
	overflow: "auto",
}

const baseStyleFooter = {
	px: 6,
	py: 4,
}

const baseStyle = (props) => ({
	overlay: baseStyleOverlay,
	dialogContainer: baseStyleDialogContainer,
	dialog: baseStyleDialog(props),
	header: baseStyleHeader,
	closeButton: baseStyleCloseButton,
	body: baseStyleBody,
	footer: baseStyleFooter,
})

const sizes = {
	xs: getSize("xs"),
	sm: getSize("md"),
	md: getSize("lg"),
	lg: getSize("2xl"),
	xl: getSize("4xl"),
	full: getSize("full"),
}

const defaultProps = {
	size: "xs",
}

const Drawer = {
	parts: parts.keys,
	baseStyle,
	sizes,
	defaultProps,
}

export default Drawer
