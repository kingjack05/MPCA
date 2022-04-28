import { Circle } from "@chakra-ui/react"

function StatusIndicator({ status }) {
	let status2Color = {
		G: "success",
		Y: "warning",
		R: "error",
	}
	const color = status2Color[status]

	return status ? (
		<Circle size="1" bg={color} mx="1" />
	) : (
		<Circle size="1" mx="1" border="1px dotted black" />
	)
}

export default StatusIndicator
