import { AutosuggestComboBox } from "../../../AutosuggestComboBox"

import { Box, Button, Input, Flex, FormErrorMessage } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export const LabForm = ({ defaultValues, onSubmit, onCancel }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues,
	})

	const onError = (e) => {
		console.log(e)
	}

	return (
		<>
			<Box mx="3" mb="3">
				<form id="Lab" onSubmit={handleSubmit(onSubmit, onError)}>
					<AutosuggestComboBox
						collection="labs"
						placeholder="Import from database..."
						otherInputProps={{ ...register("name") }}
						onSelect={({ unit }) => reset({ unit })}
						limit={3}
						mb="2"
					/>
					<Input {...register("unit", { required: true })} placeholder="unit" mb="1" />
					{errors.name && <FormErrorMessage>Name is required</FormErrorMessage>}
				</form>
			</Box>
			<Flex>
				<Button
					type="submit"
					form="Lab"
					flex="1"
					borderRadius="none"
					p="0"
					variant="primary"
				>
					Save
				</Button>
				<Button onClick={onCancel} flex="1" borderRadius="none" bg="ui03" border="none">
					Cancel
				</Button>
			</Flex>
		</>
	)
}
