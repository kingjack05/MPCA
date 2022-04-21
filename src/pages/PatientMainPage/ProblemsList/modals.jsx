import { useForm } from "react-hook-form"
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
	Input,
	Text,
} from "@chakra-ui/react"
import RadioGroup from "../../../components/RadioGroup"

export const UpdateProblemModal = ({ isOpen, onClose, patient, problemIndex }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent minH="xs" mx="1">
				<ModalHeader>Update Problem {problemIndex}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<UpdateProblemForm
						patient={patient}
						problemIndex={problemIndex}
						onClose={onClose}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

const UpdateProblemForm = ({ patient, problemIndex, onClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({ defaultValues: patient.problems[problemIndex] })

	const updateProblem = async (data) => {
		console.log(data)
		await patient.atomicUpdate((oldData) => {
			oldData.problems[problemIndex] = data
			return oldData
		})
		onClose()
	}

	return (
		<form onSubmit={handleSubmit(updateProblem)} autoComplete="off">
			<Input {...register("problem", { required: true })} placeholder="Problem" />
			<Text>{errors.problem ? "Problem is required." : " "}</Text>
			<RadioGroup control={control} name="status" label="Status" options={["G", "Y", "R"]} />
			<Button mt="2" type="submit" position="absolute" bottom="0">
				Edit
			</Button>
		</form>
	)
}

export const DeleteProblemModal = ({ isOpen, onClose, patient, problemIndex }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Delete Patient</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text>Are you sure?</Text>
					<Button
						onClick={async () => {
							await patient.atomicUpdate((oldData) => {
								oldData.problems.splice(problemIndex, 1)
								return oldData
							})
							onClose()
						}}
					>
						Delete
					</Button>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
