import { useDrawer } from "../../../../../../components/Context Providers/DrawerContext"
import { usePatientContext } from "../../../../../../components/Context Providers/PatientContext"
import { useProblemContext } from "../../../../../../components/Context Providers/ProblemContext"
import { DeleteDialogue } from "../../../../../../components/UI/Dialogues/DeleteDialogue"
import { MedForm } from "../../../../../../components/UI/Forms/MedForm"
import MedInfoUI from "../../../../../../components/UI/InfoItems/MedInfoUI/MedInfoUI"
import { SwipeEditAndLongPressBox } from "../../../../../../components/UI/SwipeEditAndLongPressBox"

export const MedInfoWrapper = ({ time }) => {
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
				setHeader("Edit Med")
				setComponent(
					<UpdateMedFormWrapper
						patient={patient}
						problemIndex={problemIndex}
						infoIndex={infoIndex}
					/>
				)
			}}
			onDelete={() => {
				onOpenDrawer()
				setHeader("Delete Med")
				setComponent(
					<DeleteMedDialogueWrapper
						patient={patient}
						problemIndex={problemIndex}
						infoIndex={infoIndex}
					/>
				)
			}}
			onLongPress={() => {}}
		>
			<MedInfoUI data={data} />
		</SwipeEditAndLongPressBox>
	) : null
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

const DeleteMedDialogueWrapper = ({ patient, problemIndex, infoIndex }) => {
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
			itemName={"Med: " + patient.problems[problemIndex].info[infoIndex].content.summary}
			onDelete={onDelete}
			onCancel={onCloseDrawer}
		/>
	) : null
}
