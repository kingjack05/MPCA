import { Box, Button } from "@chakra-ui/react"
import { useQuery, useQueryClient } from "react-query"
import { v4 as uuid } from "uuid"

import { useDrawer } from "../../../../components/Context Providers/DrawerContext"
import { TodoForm } from "../../../../components/UI/Forms/TodoForm"
import { TodoItemUI } from "../../ui/TodoItemUI"
import { PatientRxDBDocType } from "../../../../schema"
import { readPatientTodos } from "../../../../services/localRxDB/collection/patients"

export const PatientTodosList = ({
	patient,
	patientID,
}: {
	patient: PatientRxDBDocType
	patientID: string
}) => {
	const { onOpenDrawer, setHeader, setComponent, onCloseDrawer } = useDrawer()
	const { data: todos, isLoading } = useQuery(["patientTodos", patientID], () =>
		readPatientTodos(patientID)
	)
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
								client.invalidateQueries(["patientTodos", patientID])
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
				<TodoItemWrapper key={index} patient={patient} patientID={patientID} data={item} />
			))}
			<Box textStyle="body2" mt="2" mb="1">
				Done
			</Box>
			{todosDone.map((item, index) => (
				<TodoItemWrapper key={index} patient={patient} patientID={patientID} data={item} />
			))}
			{/* {patient && <pre>{JSON.stringify(patient.toJSON().todos)}</pre>} */}
		</>
	)
}

const TodoItemWrapper = ({ patient, patientID, data }) => {
	const { onOpenDrawer, setHeader, setComponent, onCloseDrawer } = useDrawer()
	const client = useQueryClient()
	const onDone = async () => {
		await patient.atomicUpdate((oldData) => {
			oldData.todos.find((todo) => todo._id === data._id).done = true
			return oldData
		})
		client.invalidateQueries(["patientTodos", patientID])
	}
	const onRevertDoneStatus = async () => {
		await patient.atomicUpdate((oldData) => {
			oldData.todos.find((todo) => todo._id === data._id).done = false
			return oldData
		})
		client.invalidateQueries(["patientTodos", patientID])
	}

	const onEdit = () => {
		onOpenDrawer()
		setHeader("Edit Todo")
		setComponent(
			<TodoForm
				defaultValues={data}
				onSubmit={async (formData) => {
					await patient.atomicUpdate((oldData) => {
						oldData.todos = oldData.todos.map((todo) =>
							todo._id === data._id ? { ...todo, ...formData } : todo
						)
						return oldData
					})
					onCloseDrawer()
					client.invalidateQueries(["patientTodos", patientID])
				}}
				onCancel={onCloseDrawer}
			/>
		)
	}
	const onDelete = async () => {
		await patient.atomicUpdate((oldData) => {
			return { ...oldData, todos: oldData.todos.filter((todo) => todo._id !== data._id) }
		})
		client.invalidateQueries(["patientTodos", patientID])
	}

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
