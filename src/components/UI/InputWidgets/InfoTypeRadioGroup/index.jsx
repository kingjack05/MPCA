import { Chemistry, Image, LicenseDraft, Notebook, Pills } from "@carbon/icons-react"
import { Box, Flex } from "@chakra-ui/react"
import { useState } from "react"

export const InfoTypeRadioGroup = ({ defaultInfoType = "Logs", onChange = (infoType) => {} }) => {
	const [infoType, setInfoType] = useState(defaultInfoType)

	const getIconButtonProps = (type) => {
		const color = infoType === type ? "interactive01" : "text03"

		return {
			as: "button",
			p: 1,
			border: "none",
			bg: "transparent",
			onClick: () => {
				setInfoType(type)
				onChange(type)
			},
			color,
			"aria-label": type,
		}
	}

	return (
		<Flex pl="2">
			<Box {...getIconButtonProps("Workup")}>
				<LicenseDraft size={32} />
			</Box>
			<Box {...getIconButtonProps("Logs")}>
				<Notebook size={32} />
			</Box>
			<Box {...getIconButtonProps("Meds")}>
				<Pills size={32} />
			</Box>
			<Box {...getIconButtonProps("Labs")}>
				<Chemistry size={32} />
			</Box>
			<Box {...getIconButtonProps("Images")}>
				<Image size={32} />
			</Box>
		</Flex>
	)
}
