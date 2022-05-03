import { AutosuggestComboBox } from "../../../AutosuggestComboBox"
import { TimeDateInput } from "../../InputWidgets/TimeDateInput"

import { Box, Button, Flex, Input } from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form"

export const MedForm = ({
	defaultValues = { time: new Date().toISOString() },
	onSubmit,
	onCancel,
}) => {
	const { register, handleSubmit, reset, control } = useForm({
		defaultValues,
	})

	return (
		<>
			<Box mx="3" mb="3">
				<form id="editMed" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					<AutosuggestComboBox
						collection="meds"
						placeholder="Med name (or import from database...)"
						otherInputProps={{ ...register("name", { required: true }) }}
						onSelect={({ strength, form, usage }) => reset({ strength, form, usage })}
						limit={5}
						mb="2"
					/>
					<Input {...register("strength")} placeholder="Strength" />
					<Input {...register("form")} placeholder="Form" />
					<Input {...register("usage")} placeholder="Usage" />
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
