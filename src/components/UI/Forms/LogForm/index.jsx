import { AutosuggestComboBox } from "../../../AutosuggestComboBox"

import { Box, Button, Input, Flex, Textarea, FormErrorMessage } from "@chakra-ui/react"
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
				<AutosuggestComboBox
					collection="logs"
					fieldName="summary"
					placeholder="Import from database..."
					onSelect={({ summary, detailed }) => reset({ summary, detailed })}
					limit={3}
					mb="2"
				/>
				<form id="Log" onSubmit={handleSubmit(onSubmit)}>
					<Input
						{...register("summary", { required: true })}
						placeholder="Summary"
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
