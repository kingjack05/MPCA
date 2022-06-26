import { Box, Button, Checkbox } from "@chakra-ui/react"
import { useQuery, useQueryClient } from "react-query"
import { v4 as uuid } from "uuid"

import { useDrawer } from "../../../components/Context Providers/DrawerContext"
import { TodoForm } from "../../../components/UI/Forms/TodoForm"
import { SwipeEditAndLongPressBox } from "../../../components/UI/SwipeEditAndLongPressBox"
import { PatientRxDBDocType } from "../../../schema"
import { readPatientTodos } from "../../../services/localRxDB/collection/patients"

export const TodosList = ({
	patient,
	patientID,
}: {
	patient: PatientRxDBDocType
	patientID: string
}) => {
	const { onOpenDrawer, setHeader, setComponent, onCloseDrawer } = useDrawer()
	const { data: todos, isLoading } = useQuery("patientTodos", () => readPatientTodos(patientID))
	const todosNotDone = isLoading ? [] : todos.filter((todo) => todo.done === false)
	const todosDone = isLoading ? [] : todos.filter((todo) => todo.done === true)
	const client = useQueryClient()
	return (
		<>
			<Button
				onClick={() => {
					onOpenDrawer()
					setHeader("Add Todo")
					setComponent(
						<TodoForm
							onSubmit={async (data) => {
								await patient.atomicUpdate((oldData) => {
									oldData.todos.push({ ...data, done: false, _id: uuid() })
									return oldData
								})
								onCloseDrawer()
								client.invalidateQueries("patientTodos")
							}}
							onCancel={onCloseDrawer}
						/>
					)
				}}
				variant="primary"
			>
				Add
			</Button>
			<Box textStyle="body2" mt="2" mb="1">
				To-Do
			</Box>
			{todosNotDone.map((item, index) => (
				<TodoItemWrapper key={index} patient={patient} data={item} />
			))}
			<Box textStyle="body2" mt="2" mb="1">
				Done
			</Box>
			{todosDone.map((item, index) => (
				<TodoItemWrapper key={index} patient={patient} data={item} />
			))}
			{/* {patient && <pre>{JSON.stringify(patient.toJSON().todos)}</pre>} */}
		</>
	)
}

const TodoItemUI = ({ data, onDone, onRevertDoneStatus, onEdit, onDelete }) => {
	const isDone = data.done
	return (
		<SwipeEditAndLongPressBox
			onEdit={onEdit}
			onDelete={onDelete}
			borderRadius="0.5"
			mx="1"
			my="1"
		>
			<Box bg="white" py="1" borderRadius="0.5" pl="1">
				<Checkbox
					isChecked={isDone}
					onChange={(e) => {
						if (isDone === false) {
							onDone()
						} else if (isDone === true) {
							onRevertDoneStatus()
						}
						// setIsDone(e.target.value)
					}}
				>
					{data.title}
				</Checkbox>
			</Box>
		</SwipeEditAndLongPressBox>
	)
}

const TodoItemWrapper = ({ patient, data }) => {
	const client = useQueryClient()
	const onDone = async () => {
		await patient.atomicUpdate((oldData) => {
			oldData.todos.find((todo) => todo._id === data._id).done = true
			return oldData
		})
		client.invalidateQueries("patientTodos")
	}
	const onRevertDoneStatus = async () => {
		await patient.atomicUpdate((oldData) => {
			oldData.todos.find((todo) => todo._id === data._id).done = false
			return oldData
		})
		client.invalidateQueries("patientTodos")
	}

	const onEdit = () => {}
	const onDelete = () => {}
	return data ? (
		<TodoItemUI
			data={data}
			onDone={onDone}
			onRevertDoneStatus={onRevertDoneStatus}
			onEdit={onEdit}
			onDelete={onDelete}
		/>
	) : null
}
