import { AutosuggestComboBox } from "../../../AutosuggestComboBox"
import { TimeDateInput } from "../../InputWidgets/TimeDateInput"

import { Box, Button, Flex, Textarea, FormErrorMessage } from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form"

export const LogForm = ({
	defaultValues = { time: new Date().toISOString() },
	onSubmit,
	onCancel,
	options = {
		withTime: true,
	},
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
			<Box mx="3" mb="3">
				<form id="Log" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
					{options.withTime && (
						<Controller
							control={control}
							name="time"
							render={({ field: { value, onChange } }) => (
								<TimeDateInput value={value} onChange={onChange} />
							)}
						/>
					)}
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
