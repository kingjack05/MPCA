import RadioCard from "./RadioCard"

import { FormControl, FormErrorMessage, FormLabel, HStack, useRadioGroup } from "@chakra-ui/react"
import { useController } from "react-hook-form"

const RadioGroup = ({ control, name, label, isRequired, options }) => {
	const {
		field,
		formState: { errors },
	} = useController({
		control,
		name,
		rules: { required: { value: true, message: "Required field" } },
	})
	const { getRootProps, getRadioProps } = useRadioGroup({
		name,
		onChange: field.onChange,
		value: field.value,
	})

	const group = getRootProps()

	return (
		<FormControl isRequired={isRequired} isInvalid={!!errors[name]} mb={6}>
			<FormLabel>{label}</FormLabel>
			<HStack {...group}>
				{options.map((value) => {
					const radio = getRadioProps({ value })
					return (
						<RadioCard key={value} {...radio}>
							{value}
						</RadioCard>
					)
				})}
			</HStack>
			<FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
		</FormControl>
	)
}

export default RadioGroup
