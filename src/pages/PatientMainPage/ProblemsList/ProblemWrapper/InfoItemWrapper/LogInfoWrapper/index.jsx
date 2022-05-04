import { useDrawer } from "../../../../../../components/Context Providers/DrawerContext"
import { usePatientContext } from "../../../../../../components/Context Providers/PatientContext"
import { useProblemContext } from "../../../../../../components/Context Providers/ProblemContext"
import { DeleteDialogue } from "../../../../../../components/UI/Dialogues/DeleteDialogue"
import { LogForm } from "../../../../../../components/UI/Forms/LogForm"
import { LogInfoUI } from "../../../../../../components/UI/InfoItems/LogInfoUI"
import { SwipeEditAndLongPressBox } from "../../../../../../components/UI/SwipeEditAndLongPressBox"

export const LogInfoWrapper = ({ time }) => {
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
				setHeader("Edit Log")
				setComponent(
					<UpdateLogFormWrapper
						patient={patient}
						problemIndex={problemIndex}
						infoIndex={infoIndex}
					/>
				)
			}}
			onDelete={() => {
				onOpenDrawer()
				setHeader("Delete Log")
				setComponent(
					<DeleteLogDialogueWrapper
						patient={patient}
						problemIndex={problemIndex}
						infoIndex={infoIndex}
					/>
				)
			}}
			onLongPress={() => {}}
		>
			<LogInfoUI data={data} />
		</SwipeEditAndLongPressBox>
	) : null
}

const UpdateLogFormWrapper = ({ patient, problemIndex, infoIndex }) => {
	const { onCloseDrawer } = useDrawer()

	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Logs", content: data }
			oldData.problems[problemIndex].info[infoIndex] = info
			return oldData
		})
		onCloseDrawer()
	}

	return (
		<LogForm
			defaultValues={patient.problems[problemIndex].info[infoIndex].content}
			onSubmit={onSubmit}
			onCancel={onCloseDrawer}
		/>
	)
}

const DeleteLogDialogueWrapper = ({ patient, problemIndex, infoIndex }) => {
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
			itemName={"Log: " + patient.problems[problemIndex].info[infoIndex].content.summary}
			onDelete={onDelete}
			onCancel={onCloseDrawer}
		/>
	) : null
}
