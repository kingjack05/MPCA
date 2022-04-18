import React from "react"
import theme from "../ds/theme"
import { Box } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"

export const Provider = ({ children, globalState }) => (
	<>
		<ChakraProvider theme={theme} resetCSS={false}>
			<Box>Theme: {globalState.theme}</Box>
			{children}
		</ChakraProvider>
	</>
)
