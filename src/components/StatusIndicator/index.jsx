import React from "react"
import { Circle } from "@chakra-ui/react"

function StatusIndicator({ status }) {
	let status2Color = {
		G: "success",
		Y: "warning",
		R: "error",
	}
	const color = status2Color[status]

	return <Circle size="1" bg={color} mx="1" />
}

export default StatusIndicator
