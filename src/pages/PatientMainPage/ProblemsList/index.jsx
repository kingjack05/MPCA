// Context
import { useDrawer } from "../../../components/Context Providers/DrawerContext"
import { usePatientContext } from "../../../components/Context Providers/PatientContext"
import { ProblemContext } from "../../../components/Context Providers/ProblemContext"

// Component
import { AutosuggestComboBox } from "../../../components/AutosuggestComboBox"
import { ProblemForm } from "../../../components/UI/Forms/ProblemForm"
import StatusIndicator from "../../../components/UI/StatusIndicator"
import { AddInfoDrawer, ProblemDrawer } from "./drawers"
import { MedicationInfo } from "./infoItems"
import { DeleteDialogue } from "../../../components/UI/Dialogues/DeleteDialogue"

import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Flex,
	Radio,
	RadioGroup,
	Stack,
	VStack,
	useDisclosure,
} from "@chakra-ui/react"
import { useCallback, useRef, useState } from "react"
import { SwipeEditAndLongPressBox } from "../../../components/UI/SwipeEditAndLongPressBox"
import { LogInfoWrapper } from "./ProblemWrapper/InfoItemWrapper/LogInfoWrapper"
import { LabInfoWrapper } from "./ProblemWrapper/InfoItemWrapper/LabInfoWrapper"

function ProblemsList({ patient }) {
	const { onOpenDrawer, setHeader, setComponent } = useDrawer()
	const [problemIndex, setProblemIndex] = useState(0)

	const {
		isOpen: isOpenProblemDrawer,
		onOpen: onOpenProblemDrawer,
		onClose: onCloseProblemDrawer,
	} = useDisclosure()
	const {
		isOpen: isOpenAddInfoDrawer,
		onOpen: onOpenAddInfoDrawer,
		onClose: onCloseAddInfoDrawer,
	} = useDisclosure()
	return (
		<Box>
			<Box textStyle="body2" my="1">
				Active Problems
			</Box>
			<VStack>
				{patient?.problems?.map((problem, index) => (
					<Problem
						problem={problem}
						key={index}
						problemIndex={index}
						onEdit={() => {
							onOpenDrawer()
							setHeader("Edit Problem")
							setComponent(
								<UpdateProblemFormWrapper patient={patient} problemIndex={index} />
							)
						}}
						onDelete={() => {
							onOpenDrawer()
							setHeader("Delete Problem")
							setComponent(
								<DeleteProblemDialogueWrapper
									patient={patient}
									problemIndex={index}
								/>
							)
						}}
						onLongPress={() => {
							setProblemIndex(index)
							onOpenProblemDrawer()
						}}
						onOpenAddInfoDrawer={() => {
							setProblemIndex(index)
							onOpenAddInfoDrawer()
						}}
					/>
				))}
				<CreateProblemButton
					onClick={() => {
						onOpenDrawer()
						setHeader("Add Problem")
						setComponent(<CreateProblemFormWrapper patient={patient} />)
					}}
				/>
			</VStack>
			<Box textStyle="body2" mt="2" mb="1">
				Underlying Problems
			</Box>
			<ProblemDrawer
				isOpen={isOpenProblemDrawer}
				onClose={onCloseProblemDrawer}
				patient={patient}
				problemIndex={problemIndex}
			/>
			<AddInfoDrawer
				isOpen={isOpenAddInfoDrawer}
				onClose={onCloseAddInfoDrawer}
				patient={patient}
				problemIndex={problemIndex}
			/>
		</Box>
	)
}

function Problem({ problemIndex, onEdit, onDelete, onLongPress, onOpenAddInfoDrawer }) {
	const { patient } = usePatientContext()
	const problem = patient?.problems[problemIndex]
	const [, updateState] = useState()
	const forceUpdate = useCallback(() => {
		updateState({})
	}, [])

	const InfoToComnponent = ({ category }, index) => {
		const typeToComponent = {
			Meds: <MedicationInfo key={index} infoIndex={index} forceUpdate={forceUpdate} />,
			Logs: <LogInfoWrapper key={index} infoIndex={index} />,
			Labs: <LabInfoWrapper key={index} infoIndex={index} />,
		}
		return typeToComponent[category]
	}

	return (
		<ProblemContext problemIndex={problemIndex}>
			<SwipeEditAndLongPressBox
				onEdit={onEdit}
				onDelete={onDelete}
				onLongPress={onLongPress}
				w="100%"
				borderRadius="base"
			>
				<Accordion defaultIndex={[0]} allowMultiple>
					<AccordionItem>
						<h2>
							<AccordionButton
								bg="white"
								borderRadius="0.5"
								py="1"
								_expanded={{ borderBottomRadius: "none" }}
							>
								<Box flex="1" textAlign="left">
									<Flex align="center">
										<StatusIndicator status={problem.status} />
										<Flex direction="column">
											<Box textStyle="h2">{problem.problem}</Box>
											<Box textStyle="label1" color="gray.700">
												Last log
											</Box>
										</Flex>
									</Flex>
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel bg="gray.100" pl="3" borderBottomRadius="0.5">
							<CreateInfoButton
								onClick={() => {
									onOpenAddInfoDrawer()
								}}
							/>
							{problem.info.map(InfoToComnponent)}
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</SwipeEditAndLongPressBox>
		</ProblemContext>
	)
}

function CreateProblemButton({ onClick }) {
	return (
		<Box
			as="button"
			onClick={onClick}
			layerStyle="basicBox"
			w="100%"
			color="text02"
			fontStyle="italic"
			_hover={{ color: "blue.600hover", shadow: "lg" }}
		>
			+ New Problem
		</Box>
	)
}

const CreateProblemFormWrapper = ({ patient }) => {
	const { onCloseDrawer } = useDrawer()
	const [createMode, setCreateMode] = useState("new")
	const templateRef = useRef()

	const addProblem = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const problem = { info: [], ...data }
			oldData.problems.push(problem)
			return oldData
		})
		onCloseDrawer()
	}

	return (
		<>
			<RadioGroup onChange={setCreateMode} value={createMode} px="3" mb="2">
				<Stack direction="row">
					<Radio value="new" size="sm">
						New
					</Radio>
					<Radio value="template" size="sm">
						Load From Template
					</Radio>
				</Stack>
			</RadioGroup>
			{createMode === "new" && <ProblemForm onSubmit={addProblem} onCancel={onCloseDrawer} />}
			{createMode === "template" && (
				<>
					<Box m="2" mb="15">
						<AutosuggestComboBox
							collection="templates"
							onSelect={(item) => {
								const { problem, status, info } = item
								const fromTemplate = { problem, status, info }
								templateRef.current = fromTemplate
							}}
							limit={3}
							fieldName="problem"
						/>
					</Box>
					<Flex>
						<Button
							onClick={async () => {
								console.log(templateRef.current)
								await addProblem(templateRef.current)
							}}
							flex="1"
							borderRadius="none"
							p="0"
							variant="primary"
						>
							Confirm
						</Button>
						<Button
							onClick={onCloseDrawer}
							flex="1"
							borderRadius="none"
							bg="ui03"
							border="none"
						>
							Cancel
						</Button>
					</Flex>
				</>
			)}
		</>
	)
}

const UpdateProblemFormWrapper = ({ patient, problemIndex }) => {
	const { onCloseDrawer } = useDrawer()

	const updateProblem = async (data) => {
		await patient.atomicUpdate((oldData) => {
			oldData.problems[problemIndex] = data
			return oldData
		})
		onCloseDrawer()
	}

	return (
		<ProblemForm
			defaultValues={patient.problems[problemIndex]}
			onSubmit={updateProblem}
			onCancel={onCloseDrawer}
		/>
	)
}

const DeleteProblemDialogueWrapper = ({ patient, problemIndex }) => {
	const { onCloseDrawer } = useDrawer()

	return patient.problems[problemIndex] ? (
		<DeleteDialogue
			itemName={"Problem: " + patient.problems[problemIndex].problem}
			onDelete={async () => {
				await patient.atomicUpdate((oldData) => {
					oldData.problems.splice(problemIndex, 1)
					return oldData
				})
				onCloseDrawer()
			}}
			onCancel={onCloseDrawer}
		/>
	) : null
}

function CreateInfoButton({ onClick }) {
	return (
		<Box
			as="button"
			onClick={onClick}
			bg="transparent"
			h="5"
			border="dashed"
			borderRadius="none"
			mb="1"
			w="100%"
			color="text02"
			fontStyle="italic"
			_hover={{ color: "blue.600hover", shadow: "lg" }}
		>
			+ New Info
		</Box>
	)
}

export default ProblemsList
