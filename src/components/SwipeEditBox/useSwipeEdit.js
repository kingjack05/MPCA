import { useState } from "react"
import { useSwipeable } from "react-swipeable"

export const useSwipeEdit = ({ onEdit, onDelete }) => {
	const [deltaX, setdeltaX] = useState(0)
	const [isSwiping, setIsSwiping] = useState(false)
	// Determine action state from deltaX
	const actionState = deltaX >= 72 ? "edit" : deltaX <= -72 ? "delete" : "inactive"
	const bg = { edit: "support04", delete: "specialDanger", inactive: "stateDisabled03" }[
		actionState
	]

	const handlers = useSwipeable({
		onSwiping: ({ event, deltaX }) => {
			event.stopPropagation()
			// Max deltaX
			setIsSwiping(true)
			if (deltaX <= 112 && -112 <= deltaX) {
				setdeltaX(deltaX)
			}
		},
		onSwiped: () => {
			setIsSwiping(false)
			if (actionState === "edit") {
				onEdit()
			} else if (actionState === "delete") {
				onDelete()
			}
			setdeltaX(0)
		},
	})

	return { isSwiping, deltaX, bg, handlers }
}
