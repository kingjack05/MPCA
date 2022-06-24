import { Box, Button, Checkbox } from "@chakra-ui/react"
import { useState } from "react"
import { useDrawer } from "../../../components/Context Providers/DrawerContext"
import { TodoForm } from "../../../components/UI/Forms/TodoForm"
import { SwipeEditAndLongPressBox } from "../../../components/UI/SwipeEditAndLongPressBox"
import { createTodo } from "../../../services/localRxDB/collection/todos.ts"

export const TodosList = ({ patient }) => {
	const { onOpenDrawer, setHeader, setComponent, onCloseDrawer } = useDrawer()
	const todos = patient?.todos ? patient.todos : []
	const todosNotDone = todos.filter((todo) => todo.done === false)
	const todosDone = todos.filter((todo) => todo.done === true)
	return (
		<>
			<Button
				onClick={() => {
					onOpenDrawer()
					setHeader("Add Todo")
					setComponent(
						<TodoForm
							onSubmit={async (data) => await createTodo(data)}
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
				<TodoItemWrapper patient={patient} data={item} index={index} />
			))}
			<Box textStyle="body2" mt="2" mb="1">
				Done
			</Box>
			{todosDone.map((item, index) => (
				<TodoItemWrapper patient={patient} data={item} index={index} />
			))}
		</>
	)
}

const TodoItemUI = ({ data, onDone, onRevertDoneStatus, onEdit, onDelete }) => {
	const [isDone, setIsDone] = useState(data.done)
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
						setIsDone(e.target.value)
					}}
				>
					{data.title}
				</Checkbox>
			</Box>
		</SwipeEditAndLongPressBox>
	)
}

const TodoItemWrapper = ({ patient, data, index }) => {
	const onDone = () => {}
	const onRevertDoneStatus = () => {}
	const onEdit = () => {}
	const onDelete = () => {}
	return (
		<TodoItemUI
			data={data}
			onDone={onDone}
			onRevertDoneStatus={onRevertDoneStatus}
			onEdit={onEdit}
			onDelete={onDelete}
		/>
	)
}
