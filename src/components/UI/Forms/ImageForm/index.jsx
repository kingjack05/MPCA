import { AutosuggestComboBox } from "../../../AutosuggestComboBox"

import { useForm } from "react-hook-form"
import { Box, Button, Textarea, Flex } from "@chakra-ui/react"

export const ImageForm = ({ defaultValues, onSubmit, onCancel }) => {
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
			<Box mx="3" mb="2">
				<form id="Lab" onSubmit={handleSubmit(onSubmit)}>
					<AutosuggestComboBox
						collection="images"
						placeholder="Image name (or import from database...)"
						otherInputProps={{ ...register("name", { required: true }) }}
						onSelect={({ summary }) => reset({ summary })}
						limit={3}
						mb="2"
					/>
					{errors.name && <Box color="error">Image Name is required</Box>}
					<Flex alignItems="center" mb="1">
						<Textarea {...register("summary")} placeholder="Summary" variant="carbon" />
					</Flex>
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
