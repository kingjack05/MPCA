// Context
import { useDrawer } from "../../../components/Context Providers/DrawerContext"
import { usePatientContext } from "../../../components/Context Providers/PatientContext"
import { ProblemContext } from "../../../components/Context Providers/ProblemContext"

// Component
import { ProblemForm } from "../../../components/UI/Forms/ProblemForm"
import StatusIndicator from "../../../components/UI/StatusIndicator"
import { AddInfoDrawer, ProblemDrawer } from "./drawers"
import { DeleteDialogue } from "../../../components/UI/Dialogues/DeleteDialogue"

import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Flex,
	VStack,
	useDisclosure,
} from "@chakra-ui/react"
import { useState } from "react"
import { SwipeEditAndLongPressBox } from "../../../components/UI/SwipeEditAndLongPressBox"
import { LogInfoWrapper } from "./ProblemWrapper/InfoItemWrapper/LogInfoWrapper"
import { LabInfoWrapper } from "./ProblemWrapper/InfoItemWrapper/LabInfoWrapper"
import { WorkupInfoWrapper } from "./ProblemWrapper/InfoItemWrapper/WorkupInfoWrapper"
import { ImageInfoWrapper } from "./ProblemWrapper/InfoItemWrapper/ImageInfoWrapper"
import { MedInfoWrapper } from "./ProblemWrapper/InfoItemWrapper/MedInfoWrapper"

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

	const activeProblems = patient?.problems
		? patient.problems.slice(
				0,
				patient.problems.findIndex(
					(item) => item.problem === "Underlying problems demarcation line"
				)
		  )
		: []
	const underlyingProblems = patient?.problems
		? patient.problems.slice(
				patient.problems.findIndex(
					({ problem }) => problem === "Underlying problems demarcation line"
				) + 1,
				patient.problems.findIndex(
					(item) => item.problem === "Subsided problems/past history demarcation line"
				)
		  )
		: []
	const subsidedProblems = patient?.problems
		? patient.problems.slice(
				patient.problems.findIndex(
					({ problem }) => problem === "Subsided problems/past history demarcation line"
				) + 1
		  )
		: []

	const problemMapper = (orignialProblemIndexPadding) => (problem, index) => {
		const originalProblemIndex = index + orignialProblemIndexPadding
		return (
			<Problem
				problem={problem}
				key={index}
				problemIndex={originalProblemIndex}
				onEdit={() => {
					onOpenDrawer()
					setHeader("Edit Problem")
					setComponent(
						<UpdateProblemFormWrapper
							patient={patient}
							problemIndex={originalProblemIndex}
						/>
					)
				}}
				onDelete={() => {
					onOpenDrawer()
					setHeader("Delete Problem")
					setComponent(
						<DeleteProblemDialogueWrapper
							patient={patient}
							problemIndex={originalProblemIndex}
						/>
					)
				}}
				onLongPress={() => {
					setProblemIndex(originalProblemIndex)
					onOpenProblemDrawer()
				}}
				onOpenAddInfoDrawer={() => {
					setProblemIndex(originalProblemIndex)
					onOpenAddInfoDrawer()
				}}
			/>
		)
	}

	return (
		<Box>
			<Box textStyle="body2" my="1">
				Active Problems
			</Box>
			<VStack>
				<CreateProblemButton
					onClick={() => {
						onOpenDrawer()
						setHeader("Add Problem")
						setComponent(<CreateProblemFormWrapper patient={patient} />)
					}}
				/>
				{activeProblems.map(problemMapper(0))}
			</VStack>
			<Box textStyle="body2" mt="2" mb="1">
				Underlying Problems
			</Box>
			<VStack>{underlyingProblems.map(problemMapper(activeProblems.length + 1))}</VStack>
			<Box textStyle="body2" mt="2" mb="1">
				Subsided Problems (Past history)
			</Box>
			<VStack>
				{subsidedProblems.map(
					problemMapper(activeProblems.length + underlyingProblems.length + 2)
				)}
			</VStack>
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
	const sortedInfo = [...problem.info].sort(function (a, b) {
		return a.content.time < b.content.time ? 1 : a.content.time > b.content.time ? -1 : 0
	})

	const InfoToComnponent = ({ category, content: { time } }, index) => {
		const typeToComponent = {
			Meds: <MedInfoWrapper key={index} time={time} />,
			Logs: <LogInfoWrapper key={index} time={time} />,
			Labs: <LabInfoWrapper key={index} time={time} />,
			Workups: <WorkupInfoWrapper key={index} time={time} />,
			Images: <ImageInfoWrapper key={index} time={time} />,
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
												Goal: {problem.goal}
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
							{sortedInfo.map(InfoToComnponent)}
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
			bg="ui01"
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

	const addProblem = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const problem = { info: [], ...data }
			oldData.problems.unshift(problem)
			return oldData
		})
		onCloseDrawer()
	}

	return <ProblemForm onSubmit={addProblem} onCancel={onCloseDrawer} />
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
