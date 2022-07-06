import { Box, Checkbox } from "@chakra-ui/react"
import { SwipeEditAndLongPressBox } from "../../../components/UI/SwipeEditAndLongPressBox"

export const TodoItemUI = ({ data, onDone, onRevertDoneStatus, onEdit, onDelete }) => {
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
					}}
				>
					{data.title}
				</Checkbox>
			</Box>
		</SwipeEditAndLongPressBox>
	)
}
