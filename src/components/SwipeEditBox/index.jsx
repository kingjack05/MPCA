import { Edit, TrashCan } from "@carbon/icons-react"
import { Box } from "@chakra-ui/react"
import React from "react"
import { useSwipeEdit } from "./useSwipeEdit"

function SwipeEditBox({ children, onEdit, onDelete, w }) {
	const { deltaX, bg, handlers } = useSwipeEdit({
		onEdit,
		onDelete,
	})

	return (
		<Box position="relative" bg={bg} overflowX="visible" zIndex="0" borderRadius="base" w={w}>
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

export default SwipeEditBox
