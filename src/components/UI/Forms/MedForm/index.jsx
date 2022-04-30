import { AutosuggestComboBox } from "../../../AutosuggestComboBox"

import { Box, Button, Flex, Input } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export const MedForm = ({ defaultValues, onSubmit, onCancel }) => {
	const { register, handleSubmit, reset } = useForm({
		defaultValues,
	})

	return (
		<>
			<Box mx="3" mb="3">
				<AutosuggestComboBox
					collection="meds"
					placeholder="Import from database..."
					onSelect={({ name, strength, form, usage }) =>
						reset({ name, strength, form, usage })
					}
					limit={5}
					mb="2"
				/>
				<form id="editMed" onSubmit={handleSubmit(onSubmit)}>
					<Input {...register("name")} placeholder="Name" />
					<Input {...register("strength")} placeholder="Strength" />
					<Input {...register("form")} placeholder="Form" />
					<Input {...register("usage")} placeholder="Usage" />
				</form>
			</Box>
			<Flex>
				<Button
					type="submit"
					form="editMed"
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
