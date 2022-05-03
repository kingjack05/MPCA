import "./dateInput.css"

import { Box, Flex, Input } from "@chakra-ui/react"
import { DateTime } from "luxon"
import { Calendar } from "@carbon/icons-react"

/**
 * Controlled Input. Use with Controller
 */
export const TimeDateInput = ({ value, onChange = (newValue) => {} }) => {
	const dt = DateTime.fromISO(value)

	return (
		<Flex alignItems="center">
			<Input
				value={dt.hour}
				onChange={(e) => {
					const hour = e.target.value
						? parseInt(e.target.value) >= 24
							? 23
							: parseInt(e.target.value)
						: 0
					onChange(dt.set({ hour }).toISO())
				}}
				bg="transparent"
				color="text02"
				w="5"
				px="1"
				borderBottom="transparent"
				_focus={{ outline: "none", borderBottom: "input" }}
				textAlign="center"
			/>
			:
			<Input
				value={dt.minute}
				onChange={(e) => {
					const minute = e.target.value
						? parseInt(e.target.value) >= 60
							? 59
							: parseInt(e.target.value)
						: 0
					onChange(dt.set({ minute }).toISO())
				}}
				bg="transparent"
				color="text02"
				w="5"
				px="1"
				borderBottom="transparent"
				_focus={{ outline: "none", borderBottom: "input" }}
				textAlign="center"
			/>
			<Box flex="1" />
			<Flex position="relative" alignItems="center" flexShrink="0">
				<Box mr="1" color="text02">
					{dt.month} / {dt.day} / {dt.year}
				</Box>
				<Box color="text02">
					<Calendar size="20" />
				</Box>
				<input
					type="date"
					style={{
						position: "absolute",
						left: "0",
						top: "0",
						width: "100%",
						height: "100%",
						opacity: "0",
						cursor: "pointer",
						boxSizing: "border-box",
					}}
					onChange={(e) => {
						const [year, month, day] = e.target.value.split("-")
						onChange(dt.set({ year, month, day }).toISO())
					}}
				/>
			</Flex>
		</Flex>
	)
}
