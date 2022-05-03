import SwipeEditBox from "../../../SwipeEditBox"

import { Edit } from "@carbon/icons-react"
import { TrashCan } from "@carbon/icons-react"
import { Pills } from "@carbon/icons-react"
import { Box, Flex, Show, Text } from "@chakra-ui/react"
import { DateTime } from "luxon"

export default function MedicationInfoUI({ data, onEdit, onDelete }) {
	return (
		<SwipeEditBox onEdit={onEdit} onDelete={onDelete} borderRadius="none">
			<Flex direction="column" bg="ui01" py="1">
				<Box pl="3" textStyle="tertiaryText">
					{data.time ? DateTime.fromISO(data.time).toFormat("LL'/'dd HH':'mm") : ""}&nbsp;
				</Box>
				<Flex lineHeight="1">
					<Pills size={16} />
					<Box flex="1" h="2" pl="1">
						<Text textStyle="label1Semi" display="inline">
							{data?.name}&nbsp;
						</Text>
						<Text textStyle="label1" display="inline" color="text02">
							{data?.strength}
						</Text>
					</Box>
					<Box textStyle="label1">{data?.usage}</Box>
					<Show above="sm">
						<Box as="button" border="none" p="0">
							<Edit size={16} />
						</Box>
						<Box as="button" border="none" p="0">
							<TrashCan size={16} />
						</Box>
					</Show>
				</Flex>
				<Box textStyle="label1" pl="3">
					{data?.annotation}
				</Box>
			</Flex>
		</SwipeEditBox>
	)
}
