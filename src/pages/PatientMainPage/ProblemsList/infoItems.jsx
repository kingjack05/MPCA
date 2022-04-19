import { Box, Flex, Text } from "@chakra-ui/react"

import { Pills } from "@carbon/icons-react"
import SwipeEditBox from "../../../components/SwipeEditBox"

export const MedicationInfo = ({ time, name, dosage, usage, annotation }) => {
	return (
		<SwipeEditBox borderRadius="none">
			<Flex direction="column" bg="ui01" py="1">
				<Box pl="3" textStyle="tertiaryText">
					{time}&nbsp;
				</Box>
				<Flex lineHeight="1">
					<Pills size={16} />
					<Box flex="1" h="2" pl="1">
						<Text textStyle="label1Semi" display="inline">
							{name}&nbsp;
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
		</SwipeEditBox>
	)
}
