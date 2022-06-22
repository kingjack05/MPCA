import { AutosuggestComboBox } from "../../../AutosuggestComboBox"
import { ReactComponent as Exchange } from "../../../CustomIcons/Icon_ Exchange.svg"
import { TimeDateInput } from "../../InputWidgets/TimeDateInput"

import { Box, Button, Input, Flex } from "@chakra-ui/react"
import { useForm, Controller } from "react-hook-form"

export const LabForm = ({
	defaultValues = { time: new Date().toISOString() },
	onSubmit,
	onCancel,
	options = { withTime: true },
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

	const onError = (e) => {
		console.log(e)
	}

	return (
		<>
			<Box mx="3" mb="2">
				<form id="Lab" onSubmit={handleSubmit(onSubmit, onError)} autoComplete="off">
					<AutosuggestComboBox
						collection="labs"
						placeholder="Lab name (or import from database...)"
						otherInputProps={{ ...register("name", { required: true }) }}
						onSelect={({ unit }) => reset({ unit })}
						limit={3}
						mb="2"
					/>
					{errors.name && <Box color="error">Lab Name is required</Box>}
					<Flex alignItems="center" mb="1">
						<Input {...register("value")} placeholder="value" />
						<Input
							{...register("unit")}
							bg="transparent"
							ml="2"
							mr="1"
							height="4"
							placeholder="unit"
						/>
						<Exchange style={{ flexShrink: "0", width: "26px", height: "26px" }} />
					</Flex>
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
