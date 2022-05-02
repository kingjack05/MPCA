import { AutosuggestComboBox } from "../../../AutosuggestComboBox"

import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	RadioGroup,
	Radio,
	Text,
} from "@chakra-ui/react"
import { useForm, Controller } from "react-hook-form"

export const ProblemForm = ({ defaultValues, onSubmit, onCancel }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm({ defaultValues })
	return (
		<>
			<Box mx="3" mb="3">
				<form id="problem" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					<AutosuggestComboBox
						collection="templates"
						fieldName="problem"
						otherInputProps={{ ...register("problem", { required: true }) }}
						placeholder="Problem name (or import from database...)"
						onSelect={({ status, goal }) => reset({ status, goal })}
						limit={3}
						mb="2"
					/>
					<Text>{errors.problem ? "Problem is required." : " "}</Text>
					<StatusRadioGroup control={control} />
					<Input {...register("goal")} placeholder="Goal" mt="2" />
				</form>
			</Box>

			<Flex>
				<Button
					type="submit"
					form="problem"
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

const StatusRadioGroup = ({ control }) => {
	return (
		<FormControl id="status">
			<FormLabel mb="1" textStyle="label1">
				Status
			</FormLabel>
			<Controller
				name="status"
				control={control}
				render={({ field }) => (
					<RadioGroup {...field}>
						<HStack>
							<Radio value="G" colorScheme="green" size="sm">
								Green
							</Radio>
							<Radio value="Y" colorScheme="yellow" size="sm">
								Yellow
							</Radio>
							<Radio value="R" colorScheme="red" size="sm">
								Red
							</Radio>
						</HStack>
					</RadioGroup>
				)}
			/>
		</FormControl>
	)
}
