import { usePatientContext } from "../../../components/Context Providers/PatientContext"
import { useProblemContext } from "../../../components/Context Providers/ProblemContext"
import { useDrawer } from "../../../components/Context Providers/DrawerContext"
import SwipeEditBox from "../../../components/SwipeEditBox"
import { MedForm } from "../../../components/UI/Forms/MedForm"

import { Pills } from "@carbon/icons-react"
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { DateTime } from "luxon"

export const MedicationInfo = ({ infoIndex, annotation, forceUpdate }) => {
	const { patient } = usePatientContext()
	const { onOpenDrawer, setHeader, setComponent } = useDrawer()
	const { problemIndex } = useProblemContext()
	const data = patient.problems[problemIndex].info[infoIndex]?.content

	const onEdit = () => {
		onOpenDrawer()
		setHeader("Edit Med")
		setComponent(
			<UpdateMedFormWrapper
				patient={patient}
				problemIndex={problemIndex}
				infoIndex={infoIndex}
			/>
		)
	}

	const onDelete = async () => {
		onOpenDrawer()
		setHeader("Delete Med")
		setComponent(
			<DeleteMed
				patient={patient}
				problemIndex={problemIndex}
				infoIndex={infoIndex}
				forceUpdate={forceUpdate}
			/>
		)
	}

	return (
		<SwipeEditBox onEdit={onEdit} onDelete={onDelete} borderRadius="none">
			<Flex direction="column" bg="ui01" py="1">
				<Box pl="3" textStyle="tertiaryText">
					{DateTime.fromISO(data.time).toFormat("LL'/'dd HH':'mm")}&nbsp;
				</Box>
				<Flex lineHeight="1">
					<Pills size={16} />
					<Box flex="1" h="2" pl="1">
						<Text textStyle="label1Semi" display="inline">
							{data?.name}&nbsp;
						</Text>
						<Text textStyle="label1" display="inline" color="text02">
							{data?.strength}
						</Text>
					</Box>
					<Box textStyle="label1">{data?.usage}</Box>
				</Flex>
				<Box textStyle="label1" pl="3">
					{annotation}
				</Box>
			</Flex>
		</SwipeEditBox>
	)
}

const UpdateMedFormWrapper = ({ patient, problemIndex, infoIndex }) => {
	const { onCloseDrawer } = useDrawer()

	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Meds", content: data }
			oldData.problems[problemIndex].info[infoIndex] = info
			return oldData
		})
		onCloseDrawer()
	}

	return (
		<MedForm
			defaultValues={patient.problems[problemIndex].info[infoIndex].content}
			onSubmit={onSubmit}
			onCancel={onCloseDrawer}
		/>
	)
}

const DeleteMed = ({ patient, problemIndex, infoIndex, forceUpdate }) => {
	const { onCloseDrawer } = useDrawer()
	const onDelete = async () => {
		await patient.atomicUpdate((oldData) => {
			oldData.problems[problemIndex].info.splice(infoIndex, 1)
			return oldData
		})
		onCloseDrawer()
		forceUpdate()
	}

	return (
		<>
			<Box px="3" mb="2">
				Are you sure?
			</Box>
			<Flex>
				<Button flex="1" borderRadius="none" p="0" variant="danger" onClick={onDelete}>
					Delete
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
	)
}
