import { readableTimeString } from "../../../../misc/utils"

import { Icon } from "@chakra-ui/icons"
import { LicenseDraft, OverflowMenuHorizontal } from "@carbon/icons-react"
import {
	Box,
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Portal,
	Show,
} from "@chakra-ui/react"

export const WorkupInfoUI = ({ data, onEdit, onDelete, onExport }) => {
	return data ? (
		<Flex direction="column" bg="ui01" py="1">
			<Box pl="3" textStyle="tertiaryText">
				{data.time ? readableTimeString(data.time) : ""}&nbsp;
			</Box>
			<Flex lineHeight="1">
				<LicenseDraft size={16} />
				<Box flex="1" h="2" pl="1" textStyle="label1Semi">
					{data.name}&nbsp;
				</Box>
				<Show above="sm">
					<Menu offset={[0, 0]} matchWidth autoSelect={false} variant="carbon">
						<MenuButton
							as={IconButton}
							icon={<Icon as={OverflowMenuHorizontal} />}
							aria-label="Options"
							borderRadius="none"
						/>
						<Portal>
							<MenuList>
								<MenuItem onClick={onEdit}>Edit</MenuItem>
								<MenuItem onClick={onDelete}>Delete</MenuItem>
								<MenuItem onClick={onExport}>Export Item</MenuItem>
							</MenuList>
						</Portal>
					</Menu>
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
