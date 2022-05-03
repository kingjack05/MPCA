import { AutosuggestComboBox } from "../../../AutosuggestComboBox"

import { Controller, useForm } from "react-hook-form"
import { Box, Button, Textarea, Flex, Input } from "@chakra-ui/react"
import { DateTime } from "luxon"
import { Calendar } from "@carbon/icons-react"

export const ImageForm = ({ defaultValues, onSubmit, onCancel }) => {
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
				<form id="Lab" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
						name="from"
						render={({ field: { value, onChange } }) => (
							<TimeDateInput value={value} onChange={onChange} />
						)}
					/>
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

const TimeDateInput = ({ value = new Date().toISOString(), onChange = () => {} }) => {
	const dt = DateTime.fromISO(value)

	return (
		<Flex alignItems="center">
			<Input
				value={dt.hour}
				type="number"
				onChange={(e) => {
					const hour = e.target.value
						? parseInt(e.target.value) >= 24
							? 23
							: parseInt(e.target.value)
						: 0
					onChange(dt.set({ hour }).toISO())
				}}
			/>
			:
			<Input
				value={dt.minute}
				onChange={(e) => {
					const minute = e.target.value
						? parseInt(e.target.value) >= 60
							? 59
							: parseInt(e.target.value)
						: 0
					onChange(dt.set({ minute }).toISO())
				}}
				mr="2"
			/>
			{dt.month}/{dt.day}/{dt.year}
			<Box position="relative" flexShrink="0" ml="2">
				<Calendar size="20" />
				<span
					style={{
						position: "absolute",
						left: "0",
						top: "0",
						width: "100%",
						height: "100%",
					}}
				></span>
				<input
					type="date"
					style={{
						position: "absolute",
						left: "0",
						top: "0",
						width: "100%",
						height: "100%",
						opacity: "0",
						cursor: "pointer",
						boxSizing: "border-box",
					}}
					onChange={(e) => {
						const [year, month, day] = e.target.value.split("-")
						onChange(dt.set({ year, month, day }).toISO())
					}}
				/>
			</Box>
		</Flex>
	)
}
