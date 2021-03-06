import { readableTimeString } from "../../../../misc/utils"

import { Edit, Image, TrashCan } from "@carbon/icons-react"
import { Box, Flex, Show } from "@chakra-ui/react"

export const ImageInfoUI = ({ data }) => {
	return data ? (
		<Flex direction="column" bg="ui01" py="1">
			<Box pl="3" textStyle="tertiaryText">
				{data.time ? readableTimeString(data.time) : ""}&nbsp;
			</Box>
			<Flex lineHeight="1">
				<Image size={16} />
				<Box flex="1" h="2" pl="1" textStyle="label1Semi">
					{data.name}&nbsp;
				</Box>
				<Show above="sm">
					<Box as="button" border="none" p="0">
						<Edit size={16} />
					</Box>
					<Box as="button" border="none" p="0">
						<TrashCan size={16} />
					</Box>
				</Show>
			</Flex>
			<Box textStyle="label1" pl="3" whiteSpace="pre-wrap">
				{data.summary}
			</Box>
			<Box textStyle="label1" pl="3" fontStyle="italic" fontWeight="light">
				{data.annotation}
			</Box>
		</Flex>
	) : null
}
