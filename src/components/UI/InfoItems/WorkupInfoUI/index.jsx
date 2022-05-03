import { Edit, LicenseDraft, TrashCan } from "@carbon/icons-react"
import { Box, Flex, Show } from "@chakra-ui/react"
import { DateTime } from "luxon"

export const WorkupInfoUI = ({ data }) => {
	return data ? (
		<Flex direction="column" bg="ui01" py="1">
			<Box pl="3" textStyle="tertiaryText">
				{data.time ? DateTime.fromISO(data.time).toFormat("LL'/'dd HH':'mm") : ""}&nbsp;
			</Box>
			<Flex lineHeight="1">
				<LicenseDraft size={16} />
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
			<Box textStyle="label1" pl="3">
				{data.summary}
			</Box>
			{data.questions.map((question, index) => {
				return (
					<Box key={index}>
						<Box pl="3" textStyle="tertiaryText" mt="1">
							{question.question}&nbsp;
						</Box>
						<Box textStyle="label1" color="mainTheme" mb="1" pl="3">
							{question.answer}&nbsp;
						</Box>
					</Box>
				)
			})}
			<Box textStyle="label1" pl="3" fontStyle="italic" fontWeight="light">
				{data.annotation}
			</Box>
		</Flex>
	) : null
}
