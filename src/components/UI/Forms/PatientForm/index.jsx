import { useForm } from "react-hook-form"
import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react"

export const PatientForm = ({ defaultValues = { name: "", summary: "" }, onSubmit, onCancel }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues })

	return (
		<>
			<Box mx="3" mb="3">
				<form id="patient" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					<Input {...register("name", { required: true })} placeholder="Name" />
					<Text color="error">{errors.name ? "Name is required." : " "}</Text>
					<Textarea mt="2" {...register("summary")} placeholder="Summary" />
					<Flex mt="2">
						<Input
							type="number"
							{...register("age", {
								required: true,
								valueAsNumber: true,
							})}
							placeholder="Age"
							mr="2"
						/>
						<Input {...register("gender", { required: true })} placeholder="Gender" />
					</Flex>
					<Flex mt="2">
						<Input {...register("weight")} placeholder="Weight" mr="2" />
						<Input {...register("height")} placeholder="Height" />
					</Flex>
					<Text color="error">{errors.age ? "Age is required." : ""}</Text>
					<Text color="error">{errors.gender ? "Gender is required." : ""}</Text>
				</form>
			</Box>
			<Flex>
				<Button
					type="submit"
					form="patient"
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
