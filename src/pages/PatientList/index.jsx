import { Box, Circle, Flex, VStack, useDisclosure } from "@chakra-ui/react"
import { CreatePatientModal, DeletePatientModal, EditPatientModal } from "./modals"
import { useEffect, useRef, useState } from "react"

import SwipeEditBox from "../../components/SwipeEditBox"
import { getDB } from "../../db"
import { useNavigate } from "react-router-dom"

function PatientList() {
	const [patients, setpatients] = useState([])
	const [patientToEdit, setPatientToEdit] = useState()
	const [patientToDelete, setPatientToDelete] = useState()
	const dbref = useRef()
	const subref = useRef()

	useEffect(() => {
		const fetchData = async () => {
			dbref.current = await getDB()
			const patientsQuery = dbref.current.patients.find({
				selector: {},
				sort: [{ name: "asc" }],
			})
			const patientsInit = await patientsQuery.exec()
			setpatients(patientsInit)
			subref.current = patientsQuery.$.subscribe((patients) => {
				if (!patients) {
					return
				}
				setpatients(patients)
			})
			return () => subref.current.unsubscribe()
		}
		fetchData()
	}, [])

	const {
		isOpen: isOpenCreatePatientModal,
		onOpen: onOpenCreatePatientModal,
		onClose: onCloseCreatePatientModal,
	} = useDisclosure()
	const {
		isOpen: isOpenUpdatePatientModal,
		onOpen: openUpdatePatientModal,
		onClose: onCloseUpdatePatientModal,
	} = useDisclosure()
	const {
		isOpen: isOpenDeletePatientModal,
		onOpen: openDeletePatientModal,
		onClose: onDeleteUpdatePatientModal,
	} = useDisclosure()
	return (
		<>
			<VStack mt="1">
				{patients.map(({ _id, name, problems, summary }) => (
					<PatientBox
						_id={_id}
						name={name}
						problem={problems[0]}
						key={_id}
						summary={summary}
						onEdit={() => {
							setPatientToEdit(_id)
							openUpdatePatientModal()
						}}
						onDelete={() => {
							setPatientToDelete(_id)
							openDeletePatientModal()
						}}
					/>
				))}
				<AddPatient onClick={onOpenCreatePatientModal} />
			</VStack>
			<CreatePatientModal
				isOpen={isOpenCreatePatientModal}
				onClose={onCloseCreatePatientModal}
			/>
			<EditPatientModal
				isOpen={isOpenUpdatePatientModal}
				onClose={onCloseUpdatePatientModal}
				patientToEdit={patientToEdit}
			/>
			<DeletePatientModal
				isOpen={isOpenDeletePatientModal}
				onClose={onDeleteUpdatePatientModal}
				patientToDelete={patientToDelete}
			/>
		</>
	)
}

function PatientBox({ _id, name, problem, summary, onEdit, onDelete }) {
	const navigate = useNavigate()
	const status = problem?.status

	return (
		<SwipeEditBox onEdit={onEdit} onDelete={onDelete}>
			<Flex
				as="button"
				align="center"
				h="7"
				p="0"
				minW="304px"
				bg="white"
				border="none"
				borderRadius="base"
				onClick={() => {
					navigate(`/patient/${_id}`)
				}}
			>
				<StatusIndicator status={status} />
				<Flex direction="column">
					{problem ? (
						<Box textStyle="h3">{problem.problem}</Box>
					) : (
						<Box
							textStyle="bodyShort1"
							fontStyle="italic"
							color="text05"
							textAlign="left"
						>
							Add Problem
						</Box>
					)}
					<Box textStyle="label1" textAlign="left">
						{name}
					</Box>
					<Box textStyle="label1" color="gray.700" textAlign="left">
						{summary ? summary : "Add summary"}
					</Box>
				</Flex>
			</Flex>
		</SwipeEditBox>
	)
}

function StatusIndicator({ status }) {
	let status2Color = {
		Y: "warning",
	}
	const color = status2Color[status]

	return <Circle size="1" bg={color} mx="1" />
}

function AddPatient({ onClick }) {
	return (
		<Box
			as="button"
			onClick={onClick}
			layerStyle="basicBox"
			color="text02"
			fontStyle="italic"
			_hover={{ color: "blue.600hover", shadow: "lg" }}
		>
			+ New Patient
		</Box>
	)
}

export default PatientList
