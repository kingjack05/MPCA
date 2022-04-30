import { useSwipeEdit } from "../../SwipeEditBox/useSwipeEdit"

import { Edit, TrashCan } from "@carbon/icons-react"
import { Box } from "@chakra-ui/react"
import { useLongPress } from "use-long-press"

export const SwipeEditAndLongPressBox = ({ children, onEdit, onDelete, onLongPress, ...props }) => {
	const { isSwiping, deltaX, bg, handlers } = useSwipeEdit({
		onEdit,
		onDelete,
	})
	const bind = useLongPress(isSwiping ? null : onLongPress, {
		onStart: (event) => event.stopPropagation(),
		captureEvent: true,
		cancelOnMovement: true,
	})

	return (
		<Box position="relative" bg={bg} overflowX="visible" zIndex="0" {...props} {...bind}>
			<Box
				{...handlers}
				transform={`translateX(${deltaX}px)`}
				position="relative"
				zIndex="2"
				opacity="1"
			>
				{children}
			</Box>
			<Box position="absolute" left="5" top="50%" transform="translateY(-50%)" zIndex="1">
				<Edit size={32} fill="white" />
			</Box>
			<Box position="absolute" right="5" top="50%" transform="translateY(-50%)" zIndex="1">
				<TrashCan size={32} fill="white" />
			</Box>
		</Box>
	)
}
