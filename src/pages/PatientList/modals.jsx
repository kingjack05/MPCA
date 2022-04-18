import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react"
import { useEffect, useRef } from "react"

import { EditPatientForm } from "./forms"
import { getDB } from "../../db"
import { useForm } from "react-hook-form"
import { usePatient } from "../../queries/usePatient"
import { v4 as uuid } from "uuid"

export const CreatePatientModal = ({ isOpen, onClose }) => {
	const dbref = useRef()
	useEffect(() => {
		const loadDB = async () => {
			dbref.current = await getDB()
		}
		loadDB()
	}, [])

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const addPatient = async (data) => {
		data = { ...data, _id: uuid() }
		dbref.current.patients.insert(data)
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Patient</ModalHeader>
				<ModalBody>
					<form onSubmit={handleSubmit(addPatient)}>
						<Input {...register("name", { required: true })} placeholder="Name" />
						<Text>{errors.name ? "Name is required." : " "}</Text>
						<Button mt="2" type="submit" variant="primary">
							Add
						</Button>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export const EditPatientModal = ({ isOpen, onClose, patientToEdit }) => {
	const { patient } = usePatient({ id: patientToEdit })

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Update Patient</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{patient?._id === patientToEdit ? (
						<EditPatientForm patient={patient} />
					) : (
						<div>Loading...</div>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export const DeletePatientModal = ({ isOpen, onClose, patientToDelete }) => {
	const { patient } = usePatient({ id: patientToDelete })

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Delete Patient</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text>Are you sure you want to delete {patient?.name}</Text>
					<Button onClick={async () => await patient.remove()}>Delete</Button>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
