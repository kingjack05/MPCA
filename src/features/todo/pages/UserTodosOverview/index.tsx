import { Box } from "@chakra-ui/react"
import { useQuery, useQueryClient } from "react-query"

import { useDrawer } from "../../../../components/Context Providers/DrawerContext"
import { TodoForm } from "../../../../components/UI/Forms/TodoForm"
import { readPatientTodos } from "../../../../services/localRxDB/collection/patients"
import { getPatientsWithTodos } from "../../services/localRXDB/getPatientsWithTodos"
import { TodoItemUI } from "../../ui/TodoItemUI"

export const UserTodosOverview = () => {
	const { data, isLoading } = useQuery("patientsWithTodos", () => getPatientsWithTodos())
	return isLoading ? null : (
		<>
			{data.map((patient) => (
				<PatientTodos key={patient._id} patient={patient} patientID={patient._id} />
			))}
		</>
	)
}

const PatientTodos = ({ patient, patientID }) => {
	const { data, isLoading } = useQuery(["patientTodos", patientID], () =>
		readPatientTodos(patientID)
	)
	return (
		!isLoading && (
			<Box>
				<Box textStyle="body2" mt="2" mb="1">
					{patient.name}
				</Box>
				{data.map((todo, index) => (
					<TodoItemWrapper
						key={index}
						patient={patient}
						patientID={patientID}
						data={todo}
					/>
				))}
			</Box>
		)
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
