// Context
import { useDrawer } from "../../components/Context Providers/DrawerContext"

import StatusIndicator from "../../components/UI/StatusIndicator"
import SwipeEditBox from "../../components/SwipeEditBox"
import { getDB } from "../../db"

import { Box, Flex, VStack } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid"
import { PatientForm } from "../../components/UI/Forms/PatientForm"
import { DeleteDialogue } from "../../components/UI/Dialogues/DeleteDialogue"

function PatientList() {
	const { onOpenDrawer, setHeader, setComponent } = useDrawer()
	const [patients, setpatients] = useState([])
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

	return (
		<>
			<VStack w="100%" mt="1">
				{patients.map((patient) => {
					const { _id, name, problems, summary } = patient
					return (
						<PatientBox
							_id={_id}
							name={name}
							problem={
								problems.filter(
									({ problem }) =>
										problem !== "Underlying problems demarcation line" &&
										problem !==
											"Subsided problems/past history demarcation line"
								)[0]
							}
							key={_id}
							summary={summary}
							onEdit={() => {
								onOpenDrawer()
								setHeader("Edit Patient")
								setComponent(<UpdatePatientFormWrapper patient={patient} />)
							}}
							onDelete={() => {
								onOpenDrawer()
								setHeader("Delete Patient")
								setComponent(<DeletePatientDialogueWrapper patient={patient} />)
							}}
						/>
					)
				})}
				<CreatePatientButton
					onClick={() => {
						onOpenDrawer()
						setHeader("Add Patient")
						setComponent(<CreatePatientFormWrapper />)
					}}
				/>
			</VStack>
		</>
	)
}

function PatientBox({ _id, name, problem, summary, onEdit, onDelete }) {
	const navigate = useNavigate()
	const status = problem?.status

	return (
		<SwipeEditBox onEdit={onEdit} onDelete={onDelete} w="100%">
			<Flex
				as="button"
				onClick={() => {
					navigate(`/patient/${_id}`)
				}}
				align="center"
				h="7"
				p="0"
				w="100%"
				bg="white"
				border="none"
				borderRadius="base"
			>
				<StatusIndicator status={status} />
				<Flex direction="column">
					{problem ? (
						<Box textStyle="h3" textAlign="left">
							{problem.problem}
						</Box>
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

function CreatePatientButton({ onClick }) {
	return (
		<Box
			as="button"
			onClick={onClick}
			layerStyle="basicBox"
			bg="gray.100"
			w="100%"
			color="text02"
			fontStyle="italic"
			_hover={{ color: "blue.600hover", shadow: "lg" }}
		>
			+ New Patient
		</Box>
	)
}

const CreatePatientFormWrapper = () => {
	const { onCloseDrawer } = useDrawer()
	const dbref = useRef()
	useEffect(() => {
		const loadDB = async () => {
			dbref.current = await getDB()
		}
		loadDB()
	}, [])

	const createPatient = async (data) => {
		data = {
			...data,
			_id: uuid(),
			problems: [
				{ problem: "Underlying problems demarcation line" },
				{ problem: "Subsided problems/past history demarcation line" },
			],
		}
		dbref.current.patients.insert(data)
	}

	return <PatientForm onSubmit={createPatient} onCancel={onCloseDrawer} />
}

const UpdatePatientFormWrapper = ({ patient }) => {
	const { onCloseDrawer } = useDrawer()

	const updatePatient = (data) => {
		patient.update({ $set: data })
	}

	const { name, summary, age, gender, weight, height } = patient

	return (
		<PatientForm
			defaultValues={{ name, summary, age, gender, weight, height }}
			onSubmit={updatePatient}
			onCancel={onCloseDrawer}
		/>
	)
}

const DeletePatientDialogueWrapper = ({ patient }) => {
	const { onCloseDrawer } = useDrawer()

	return (
		<DeleteDialogue
			itemName={"Patient: " + patient.name}
			onDelete={async () => {
				await patient.remove()
				onCloseDrawer()
			}}
			onCancel={onCloseDrawer}
		/>
	)
}

export default PatientList
