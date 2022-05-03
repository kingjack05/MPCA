import { AutosuggestComboBox } from "../../../AutosuggestComboBox"
import { TimeDateInput } from "../../InputWidgets/TimeDateInput"

import { Controller, useForm } from "react-hook-form"
import { Box, Button, Textarea, Flex } from "@chakra-ui/react"

export const ImageForm = ({
	defaultValues = { time: new Date().toISOString() },
	onSubmit,
	onCancel,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm({
		defaultValues,
	})

	return (
		<>
			<Box mx="3" mb="2">
				<form id="Image" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
					<Controller
						control={control}
						name="time"
						render={({ field: { value, onChange } }) => (
							<TimeDateInput value={value} onChange={onChange} />
						)}
					/>
				</form>
			</Box>
			<Flex>
				<Button
					type="submit"
					form="Image"
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
