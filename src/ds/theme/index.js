import { extendTheme, theme as defaultTheme } from "@chakra-ui/react"
import breakpoints from "./breakpoints"
import components from "./components"
import foundations from "./foundations"
import typography from "./typography"
import { semanticTokens } from "./semantic"

const theme = extendTheme(
	{
		components,
		semanticTokens,
		...typography,
		...foundations,
	},
	{
		config: defaultTheme.config,
		direction: defaultTheme.direction,
		transition: defaultTheme.transition,
		breakpoints,
		zIndices: defaultTheme.zIndices,
		// components: {},
		styles: {
			global: {
				"html, body": {
					background: "ui01",
				},
				a: {
					color: "teal.500",
				},
			},
		},
		borders: {},
		colors: {},
		radii: {},
		shadows: {},
		sizes: {},
		space: {},
		fonts: {},
		fontSizes: {},
		fontWeights: {},
		letterSpacings: {},
		lineHeights: {},
	}
)
export default theme
