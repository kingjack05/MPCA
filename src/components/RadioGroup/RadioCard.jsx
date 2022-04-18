import React from "react"
import { useRadio, Box } from "@chakra-ui/react"

const RadioCard = (props) => {
	const { getInputProps, getCheckboxProps } = useRadio(props)

	const input = getInputProps()
	const checkbox = getCheckboxProps()

	return (
		<Box as="label">
			<input {...input} />
			<Box
				{...checkbox}
				cursor="pointer"
				borderWidth="1px"
				borderRadius="md"
				boxShadow="md"
				_checked={{
					bg: "pink.500",
					color: "white",
					borderColor: "pink.500",
				}}
				_focus={{
					boxShadow: "outline",
				}}
				px="1"
				py="0"
			>
				{props.children}
			</Box>
		</Box>
	)
}

export default RadioCard
