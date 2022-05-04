import { useDrawer } from "../../../../../../components/Context Providers/DrawerContext"
import { usePatientContext } from "../../../../../../components/Context Providers/PatientContext"
import { useProblemContext } from "../../../../../../components/Context Providers/ProblemContext"
import { SwipeEditAndLongPressBox } from "../../../../../../components/UI/SwipeEditAndLongPressBox"
import { WorkupForm } from "../../../../../../components/UI/Forms/WorkupForm"
import { WorkupConsumerForm } from "../../../../../../components/UI/Forms/WorkupConsumerForm"
import { WorkupInfoUI } from "../../../../../../components/UI/InfoItems/WorkupInfoUI"
import { DeleteDialogue } from "../../../../../../components/UI/Dialogues/DeleteDialogue"

export const WorkupInfoWrapper = ({ time }) => {
	const { patient } = usePatientContext()
	const { problemIndex } = useProblemContext()
	const { onOpenDrawer, setHeader, setComponent } = useDrawer()

	const infoIndex = patient.problems[problemIndex].info.findIndex(
		(element) => element.content.time === time
	)
	const data = patient.problems[problemIndex].info[infoIndex]?.content

	return data ? (
		<SwipeEditAndLongPressBox
			onEdit={() => {
				onOpenDrawer()
				setHeader("Edit Workup")
				setComponent(
					<UpdateWorkupFormWrapper
						patient={patient}
						problemIndex={problemIndex}
						infoIndex={infoIndex}
					/>
				)
			}}
			onDelete={() => {
				onOpenDrawer()
				setHeader("Delete Workup")
				setComponent(
					<DeleteWorkupDialogueWrapper
						patient={patient}
						problemIndex={problemIndex}
						infoIndex={infoIndex}
					/>
				)
			}}
			onDoubleTap={() => {
				onOpenDrawer()
				setHeader("Workup")
				setComponent(
					<WorkupConsumerFormWrapper
						patient={patient}
						problemIndex={problemIndex}
						infoIndex={infoIndex}
					/>
				)
			}}
		>
			<WorkupInfoUI data={data} />
		</SwipeEditAndLongPressBox>
	) : null
}

const UpdateWorkupFormWrapper = ({ patient, problemIndex, infoIndex }) => {
	const { onCloseDrawer } = useDrawer()

	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Workups", content: data }
			oldData.problems[problemIndex].info[infoIndex] = info
			return oldData
		})
		onCloseDrawer()
	}

	return (
		<WorkupForm
			defaultValues={patient.problems[problemIndex].info[infoIndex].content}
			onSubmit={onSubmit}
			onCancel={onCloseDrawer}
		/>
	)
}

const DeleteWorkupDialogueWrapper = ({ patient, problemIndex, infoIndex }) => {
	const { onCloseDrawer } = useDrawer()

	const onDelete = async () => {
		await patient.atomicUpdate((oldData) => {
			oldData.problems[problemIndex].info.splice(infoIndex, 1)
			return oldData
		})
		onCloseDrawer()
	}

	return patient.problems[problemIndex].info[infoIndex] ? (
		<DeleteDialogue
			itemName={"Workup: " + patient.problems[problemIndex].info[infoIndex].content.name}
			onDelete={onDelete}
			onCancel={onCloseDrawer}
		/>
	) : null
}

const WorkupConsumerFormWrapper = ({ patient, problemIndex, infoIndex }) => {
	const { onCloseDrawer } = useDrawer()

	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Workups", content: data }
			oldData.problems[problemIndex].info[infoIndex] = info
			return oldData
		})
		onCloseDrawer()
	}

	return (
		<WorkupConsumerForm
			defaultValues={patient.problems[problemIndex].info[infoIndex].content}
			onSubmit={onSubmit}
			onCancel={onCloseDrawer}
		/>
	)
}
