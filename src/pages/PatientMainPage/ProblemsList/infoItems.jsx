import { Box, Flex, Text } from "@chakra-ui/react"
import { Pills } from "@carbon/icons-react"

export const MedicationInfo = ({ time, name, dosage, usage, annotation }) => {
	return (
		<Flex direction="column">
			<Box pl="3" textStyle="tertiaryText">
				{time}
			</Box>
			<Flex lineHeight="1">
				<Pills size={16} />
				<Box flex="1" pl="1">
					<Text textStyle="label1Semi" display="inline">
						{name}
					</Text>
					<Text textStyle="label1" display="inline" color="text02">
						{dosage}
					</Text>
				</Box>
				<Box textStyle="label1">{usage}</Box>
			</Flex>
			<Box textStyle="label1" pl="3">
				{annotation}
			</Box>
		</Flex>
	)
}
