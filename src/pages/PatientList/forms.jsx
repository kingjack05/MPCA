import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button, Input, Text, Textarea } from "@chakra-ui/react"
export function EditPatientForm({ patient }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: { name: patient.name, summary: patient.summary } })
	const updatePatient = (data) => {
		patient.update({ $set: data })
	}

	useEffect(() => {
		console.log(patient.name)
	}, [])

	return (
		<form onSubmit={handleSubmit(updatePatient)}>
			<Input {...register("name", { required: true })} placeholder="Name" />
			<Text>{errors.name ? "Name is required." : " "}</Text>
			<Textarea {...register("summary")} placeholder="Summary" />
			<Button mt="2" type="submit">
				Update
			</Button>
			<div>{JSON.stringify(patient)}</div>
		</form>
	)
}
