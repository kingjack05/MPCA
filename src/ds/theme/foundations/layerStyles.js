const layerStyles = {
	basicBox: {
		minW: "304px",
		h: "7",
		p: "0",
		bg: "white",
		border: "none",
		borderRadius: "base",
	},
	hamburgerMenuItem: {
		display: "flex",
		alignItems: "center",
		h: "4",
		color: "gray.700",
		textDecoration: "none",
		_hover: {
			bg: "gray.200",
			color: "gray.1000",
		},
	},
	transparentBorder: {
		border: "2px",
		borderRadius: "lg",
		borderColor: "transparent",
	},
	selectedBorder: {
		border: "2px",
		borderRadius: "lg",
		borderColor: "primary.500",
	},
}

export default layerStyles
