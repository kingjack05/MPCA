import { ProblemContext } from "../../../components/Context Providers/ProblemContext"
import StatusIndicator from "../../../components/StatusIndicator"
import SwipeEditBox from "../../../components/SwipeEditBox"
import { AddInfoDrawer, ProblemDrawer } from "./drawers"
import { MedicationInfo } from "./infoItems"
import { CreateProblemModal, DeleteProblemModal, UpdateProblemModal } from "./modals"

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
import { useCallback, useState } from "react"
import { useLongPress } from "use-long-press"
import { usePatientContext } from "../../../components/Context Providers/PatientContext"

function ProblemsList({ patient }) {
	const [problemIndex, setProblemIndex] = useState(0)

	const {
		isOpen: isOpenCreateProblemModal,
		onOpen: onOpenCreateProblemModal,
		onClose: onCloseCreateProblemModal,
	} = useDisclosure()
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
						onOpenAddInfoDrawer={onOpenAddInfoDrawer}
					/>
				))}
				<AddProblem onClick={onOpenCreateProblemModal} />
			</VStack>
			<Box textStyle="body2" mt="2" mb="1">
				Underlying Problems
			</Box>
			<CreateProblemModal
				isOpen={isOpenCreateProblemModal}
				onClose={onCloseCreateProblemModal}
				patient={patient}
			/>
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

function AddProblem({ onClick }) {
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
