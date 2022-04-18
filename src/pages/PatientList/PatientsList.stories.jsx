import PatientList from "."
import "../../index.css"
import theme from "../../ds/theme"
import { Box, ChakraProvider } from "@chakra-ui/react"

export const standard = () => <PatientList />
export default {
	decorators: [
		(Story) => (
			<ChakraProvider theme={theme} resetCSS={false}>
				<Box fontFamily="body">Hi</Box>
				<Story />
			</ChakraProvider>
		),
	],
}
