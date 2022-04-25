// Context
import { useDrawer } from "../../../components/Context Providers/DrawerContext"
import { usePatientContext } from "../../../components/Context Providers/PatientContext"
import { ProblemContext } from "../../../components/Context Providers/ProblemContext"

// Component
import { AutosuggestComboBox } from "../../../components/AutosuggestComboBox"
import SwipeEditBox from "../../../components/SwipeEditBox"
import StatusIndicator from "../../../components/UI/StatusIndicator"
import { AddInfoDrawer, ProblemDrawer } from "./drawers"
import { MedicationInfo } from "./infoItems"
import { DeleteProblemModal, UpdateProblemModal } from "./modals"

import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Flex,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react"
import { useCallback, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useLongPress } from "use-long-press"

function ProblemsList({ patient }) {
	const { onOpenDrawer, setHeader, setComponent } = useDrawer()
	const [problemIndex, setProblemIndex] = useState(0)

	const {
		isOpen: isOpenUpdateProblemModal,
		onOpen: onOpenUpdateProblemModal,
		onClose: onCloseUpdateProblemModal,
	} = useDisclosure()
	const {
		isOpen: isOpenDeleteProblemModal,
		onOpen: onOpenDeleteProblemModal,
		onClose: onCloseDeleteProblemModal,
	} = useDisclosure()
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
							setProblemIndex(index)
							onOpenUpdateProblemModal()
						}}
						onDelete={() => {
							setProblemIndex(index)
							onOpenDeleteProblemModal()
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
						setComponent(<CreateProblem patient={patient} />)
					}}
				/>
			</VStack>
			<Box textStyle="body2" mt="2" mb="1">
				Underlying Problems
			</Box>
			<UpdateProblemModal
				isOpen={isOpenUpdateProblemModal}
				onClose={onCloseUpdateProblemModal}
				patient={patient}
				problemIndex={problemIndex}
			/>
			<DeleteProblemModal
				isOpen={isOpenDeleteProblemModal}
				onClose={onCloseDeleteProblemModal}
				patient={patient}
				problemIndex={problemIndex}
			/>
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
	const bind = useLongPress(onLongPress)
	const { patient } = usePatientContext()
	const problem = patient?.problems[problemIndex]
	const [, updateState] = useState()
	const forceUpdate = useCallback(() => {
		updateState({})
	}, [])

	const InfoToComnponent = ({ category }, index) => {
		const typeToComponent = {
			Meds: <MedicationInfo key={index} infoIndex={index} forceUpdate={forceUpdate} />,
		}
		return typeToComponent[category]
	}

	return (
		<ProblemContext problemIndex={problemIndex}>
			<SwipeEditBox onEdit={onEdit} onDelete={onDelete} w="100%">
				<Accordion defaultIndex={[0]} allowMultiple>
					<AccordionItem>
						<h2>
							<AccordionButton
								{...bind}
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
							<AddInfo
								onClick={() => {
									onOpenAddInfoDrawer()
								}}
							/>
							{problem.info.map(InfoToComnponent)}
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</SwipeEditBox>
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

const CreateProblem = ({ patient }) => {
	const { onCloseDrawer } = useDrawer()
	const [createMode, setCreateMode] = useState("new")
	const templateRef = useRef()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

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
			{createMode === "new" && (
				<>
					<Box m="2">
						<form
							id="addProblem"
							onSubmit={handleSubmit(addProblem)}
							autoComplete="off"
						>
							<Input
								{...register("problem", { required: true })}
								placeholder="Problem"
								variant="carbon"
							/>
							<Text>{errors.problem ? "Problem is required." : " "}</Text>
						</form>
					</Box>
					<Flex>
						<Button
							type="submit"
							form="addProblem"
							flex="1"
							borderRadius="none"
							p="0"
							variant="primary"
						>
							Add
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

function AddInfo({ onClick }) {
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
