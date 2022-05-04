import { useDrawer } from "../../../../../../components/Context Providers/DrawerContext"
import { usePatientContext } from "../../../../../../components/Context Providers/PatientContext"
import { useProblemContext } from "../../../../../../components/Context Providers/ProblemContext"
import { DeleteDialogue } from "../../../../../../components/UI/Dialogues/DeleteDialogue"
import { LabForm } from "../../../../../../components/UI/Forms/LabForm"
import { LabInfoUI } from "../../../../../../components/UI/InfoItems/LabInfoUI"
import { SwipeEditAndLongPressBox } from "../../../../../../components/UI/SwipeEditAndLongPressBox"

export const LabInfoWrapper = ({ time }) => {
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
				setHeader("Edit Lab")
				setComponent(
					<UpdateLabFormWrapper
						patient={patient}
						problemIndex={problemIndex}
						infoIndex={infoIndex}
					/>
				)
			}}
			onDelete={() => {
				onOpenDrawer()
				setHeader("Delete Lab")
				setComponent(
					<DeleteLabDialogueWrapper
						patient={patient}
						problemIndex={problemIndex}
						infoIndex={infoIndex}
					/>
				)
			}}
			onLongPress={() => {}}
		>
			<LabInfoUI data={data} />
		</SwipeEditAndLongPressBox>
	) : null
}

const UpdateLabFormWrapper = ({ patient, problemIndex, infoIndex }) => {
	const { onCloseDrawer } = useDrawer()

	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Labs", content: data }
			oldData.problems[problemIndex].info[infoIndex] = info
			return oldData
		})
		onCloseDrawer()
	}

	return (
		<LabForm
			defaultValues={patient.problems[problemIndex].info[infoIndex].content}
			onSubmit={onSubmit}
			onCancel={onCloseDrawer}
		/>
	)
}

const DeleteLabDialogueWrapper = ({ patient, problemIndex, infoIndex }) => {
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
			itemName={"Lab: " + patient.problems[problemIndex].info[infoIndex].content.name}
			onDelete={onDelete}
			onCancel={onCloseDrawer}
		/>
	) : null
}
