import { AutosuggestComboBox } from "../../../AutosuggestComboBox"

import { Box, Button, Flex, Textarea, FormErrorMessage } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export const LogForm = ({ defaultValues, onSubmit, onCancel }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues,
	})
	return (
		<>
			<Box mx="3" mb="3">
				<form id="Log" onSubmit={handleSubmit(onSubmit)}>
					<AutosuggestComboBox
						collection="logs"
						fieldName="summary"
						otherInputProps={{ ...register("summary", { required: true }) }}
						placeholder="Summary (or import from database...)"
						onSelect={({ detailed }) => reset({ detailed })}
						limit={3}
						mb="1"
					/>
					{errors.summary && <FormErrorMessage>Summary is required</FormErrorMessage>}
					<Textarea {...register("detailed")} placeholder="Details" variant="carbon" />
				</form>
			</Box>
			<Flex>
				<Button
					type="submit"
					form="Log"
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
