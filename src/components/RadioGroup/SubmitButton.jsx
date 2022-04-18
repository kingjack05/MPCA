import React from "react"
import { Button } from "@chakra-ui/react"

const SubmitButton = () => (
	<Button
		type="submit"
		colorScheme="pink"
		color="white"
		_active={{ transform: "translateY(2px)" }}
		_focus={{ boxShadow: "none" }}
		borderRadius="4px"
	>
		Submit
	</Button>
)

export default SubmitButton
