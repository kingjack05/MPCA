import { useDrawer } from "../../../../../../components/Context Providers/DrawerContext"
import { usePatientContext } from "../../../../../../components/Context Providers/PatientContext"
import { useProblemContext } from "../../../../../../components/Context Providers/ProblemContext"
import { DeleteDialogue } from "../../../../../../components/UI/Dialogues/DeleteDialogue"
import { ImageForm } from "../../../../../../components/UI/Forms/ImageForm"
import { ImageInfoUI } from "../../../../../../components/UI/InfoItems/ImageInfoUI"
import { SwipeEditAndLongPressBox } from "../../../../../../components/UI/SwipeEditAndLongPressBox"

export const ImageInfoWrapper = ({ time }) => {
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
				setHeader("Edit Image")
				setComponent(
					<UpdateImageFormWrapper
						patient={patient}
						problemIndex={problemIndex}
						infoIndex={infoIndex}
					/>
				)
			}}
			onDelete={() => {
				onOpenDrawer()
				setHeader("Delete Image")
				setComponent(
					<DeleteImageDialogueWrapper
						patient={patient}
						problemIndex={problemIndex}
						infoIndex={infoIndex}
					/>
				)
			}}
			onLongPress={() => {}}
		>
			<ImageInfoUI data={data} />
		</SwipeEditAndLongPressBox>
	) : null
}

const UpdateImageFormWrapper = ({ patient, problemIndex, infoIndex }) => {
	const { onCloseDrawer } = useDrawer()

	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Images", content: data }
			oldData.problems[problemIndex].info[infoIndex] = info
			return oldData
		})
		onCloseDrawer()
	}

	return (
		<ImageForm
			defaultValues={patient.problems[problemIndex].info[infoIndex].content}
			onSubmit={onSubmit}
			onCancel={onCloseDrawer}
		/>
	)
}

const DeleteImageDialogueWrapper = ({ patient, problemIndex, infoIndex }) => {
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
			itemName={"Image: " + patient.problems[problemIndex].info[infoIndex].content.name}
			onDelete={onDelete}
			onCancel={onCloseDrawer}
		/>
	) : null
}
