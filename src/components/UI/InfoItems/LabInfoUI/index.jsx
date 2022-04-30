import { Chemistry, Edit, TrashCan } from "@carbon/icons-react"
import { Box, Flex, Show, Text } from "@chakra-ui/react"

export const LabInfoUI = ({ data }) => {
	return (
		<Flex direction="column" bg="ui01" py="1">
			<Box pl="3" textStyle="tertiaryText">
				{data?.time}&nbsp;
			</Box>
			<Flex lineHeight="1">
				<Chemistry size={16} />
				<Box flex="1" h="2" pl="1">
					<Text textStyle="label1Semi" display="inline">
						{data?.name}&nbsp;
					</Text>
					<Text textStyle="tertiaryText" display="inline" color="text05">
						({data?.unit})
					</Text>
				</Box>
				<Box>
					<Text
						textStyle="label1"
						display="inline"
						color={data?.value > data?.max || data?.value < data?.min ? "error" : ""}
					>
						{data?.value}
					</Text>
					<Text textStyle="tertiaryText" display="inline" color="text05">
						({data?.min}~{data?.max})
					</Text>
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
				{data?.detailed}
			</Box>
			<Box textStyle="label1" pl="3" fontStyle="italic" fontWeight="light">
				{data?.annotation}
			</Box>
		</Flex>
	)
}
