import { mode } from "@chakra-ui/theme-tools"
import { modalAnatomy as parts } from "@chakra-ui/anatomy"

const baseStyleOverlay = {
	bg: "blackAlpha.600",
	zIndex: "modal",
}

const baseStyleDialogContainer = (props) => {
	const { isCentered, scrollBehavior } = props

	return {
		display: "flex",
		zIndex: "modal",
		justifyContent: "center",
		alignItems: isCentered ? "center" : "flex-start",
		overflow: scrollBehavior === "inside" ? "hidden" : "auto",
	}
}

const baseStyleDialog = (props) => {
	const { scrollBehavior } = props

	return {
		borderRadius: "none",
		bg: mode("white", "gray.700")(props),
		color: "inherit",
		my: "3.75rem",
		zIndex: "modal",
		maxH: scrollBehavior === "inside" ? "calc(100% - 7.5rem)" : undefined,
		boxShadow: mode("lg", "dark-lg")(props),
	}
}

const baseStyleHeader = {
	px: 6,
	py: 2,
	fontSize: "20px",
	fontWeight: "semibold",
}

const baseStyleCloseButton = {
	position: "absolute",
	top: 2,
	insetEnd: 3,
}

const baseStyleBody = (props) => {
	const { scrollBehavior } = props
	return {
		px: 6,
		py: 1,
		flex: 1,
		overflow: scrollBehavior === "inside" ? "auto" : undefined,
	}
}

const baseStyleFooter = {
	px: 6,
	py: 4,
}

const baseStyle = (props) => ({
	overlay: baseStyleOverlay,
	dialogContainer: baseStyleDialogContainer(props),
	dialog: baseStyleDialog(props),
	header: baseStyleHeader,
	closeButton: baseStyleCloseButton,
	body: baseStyleBody(props),
	footer: baseStyleFooter,
})

/**
 * Since the `maxWidth` prop references theme.sizes internally,
 * we can leverage that to size our modals.
 */
function getSize(value) {
	if (value === "full") {
		return {
			dialog: {
				maxW: "100vw",
				minH: "100vh",
				"@supports(min-height: -webkit-fill-available)": {
					minH: "-webkit-fill-available",
				},
				my: 0,
			},
		}
	}
	return {
		dialog: { maxW: value },
	}
}

const sizes = {
	xs: getSize("xs"),
	sm: getSize("sm"),
	md: getSize("md"),
	lg: getSize("lg"),
	xl: getSize("xl"),
	"2xl": getSize("2xl"),
	"3xl": getSize("3xl"),
	"4xl": getSize("4xl"),
	"5xl": getSize("5xl"),
	"6xl": getSize("6xl"),
	full: getSize("full"),
}

const defaultProps = {
	size: "md",
}

const Modal = {
	parts: parts.keys,
	baseStyle,
	sizes,
	defaultProps,
}

export default Modal
