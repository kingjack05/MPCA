import { AutosuggestComboBox } from "../../../components/AutosuggestComboBox"
import { usePatientContext } from "../../../components/Context Providers/PatientContext"
import { useProblemContext } from "../../../components/Context Providers/ProblemContext"
import { useDrawer } from "../../../components/Context Providers/DrawerContext"
import SwipeEditBox from "../../../components/SwipeEditBox"
import { medsSchema } from "../../../schema"

import { Pills } from "@carbon/icons-react"
import { Box, Button, Input, Flex, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export const MedicationInfo = ({ infoIndex, annotation, forceUpdate }) => {
	const { patient } = usePatientContext()
	const { onOpenDrawer, setHeader, setComponent } = useDrawer()
	const { problemIndex } = useProblemContext()
	const data = patient.problems[problemIndex].info[infoIndex]?.content

	const onEdit = () => {
		onOpenDrawer()
		setHeader("Edit Med")
		setComponent(
			<EditMed patient={patient} problemIndex={problemIndex} infoIndex={infoIndex} />
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
					{data?.time}&nbsp;
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

const EditMed = ({ patient, problemIndex, infoIndex }) => {
	const { register, handleSubmit, reset } = useForm({
		defaultValues: patient.problems[problemIndex].info[infoIndex].content,
	})
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
		<>
			<Box mx="3">
				<AutosuggestComboBox
					schema={medsSchema}
					onSelect={({ name, strength, dosage, form }) =>
						reset({ name, strength, dosage, form })
					}
					limit={1}
				/>
				<form id="editMed" onSubmit={handleSubmit(onSubmit)}>
					<Input {...register("name")} placeholder="Name" />
					<Input {...register("strength")} placeholder="Strength" />
					<Input {...register("form")} placeholder="Form" />
					<Input {...register("usage")} placeholder="Usage" />
				</form>
			</Box>
			<Flex>
				<Button
					type="submit"
					form="editMed"
					flex="1"
					borderRadius="none"
					p="0"
					variant="primary"
				>
					Save
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
