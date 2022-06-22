import MedInfoUI from "../InfoItems/MedInfoUI/MedInfoUI"
import StatusIndicator from "../StatusIndicator"
import SwipeEditBox from "../../SwipeEditBox"

import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Flex,
} from "@chakra-ui/react"
import { LabInfoUI } from "../InfoItems/LabInfoUI"
import { LogInfoUI } from "../InfoItems/LogInfoUI"
import { ImageInfoUI } from "../InfoItems/ImageInfoUI"
import { WorkupInfoUI } from "../InfoItems/WorkupInfoUI"
import { SwipeEditAndLongPressBox } from "../SwipeEditAndLongPressBox"

export default function ProblemUI({
	data,
	onEditProblem,
	onDeleteProblem,
	onCreateInfo,
	onUpdateInfo = (infoIndex, category) => {},
	onDeleteInfo = (infoIndex, category) => {},
}) {
	const InfoToComnponent = ({ category, content }, infoIndex) => {
		const itemProps = {
			key: infoIndex,
			onEdit: () => onUpdateInfo(infoIndex, category),
			onDelete: () => onDeleteInfo(infoIndex, category),
		}
		const typeToComponent = {
			Meds: <MedInfoUI data={content} />,
			Labs: <LabInfoUI data={content} />,
			Logs: <LogInfoUI data={content} />,
			Images: <ImageInfoUI data={content} />,
			Workups: <WorkupInfoUI data={content} />,
		}
		return (
			<SwipeEditAndLongPressBox {...itemProps}>
				{typeToComponent[category]}
			</SwipeEditAndLongPressBox>
		)
	}

	return (
		<SwipeEditBox onEdit={onEditProblem} onDelete={onDeleteProblem} w="100%">
			<Accordion defaultindex={[0]} allowMultiple>
				<AccordionItem>
					<h2>
						<AccordionButton
							bg="white"
							borderRadius="0.5"
							py="1"
							_expanded={{ borderBottomRadius: "none" }}
						>
							<Box flex="1" textAlign="left">
								<Flex align="center">
									<StatusIndicator status={data.status} />
									<Flex direction="column">
										<Box textStyle="h2">{data.problem}</Box>
										<Box textStyle="label1" color="gray.700">
											Last log
										</Box>
									</Flex>
								</Flex>
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel bg="gray.100" pl="3" borderBottomRadius="0.5">
						<CreateInfoButton onClick={onCreateInfo} />
						{data.info.map(InfoToComnponent)}
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</SwipeEditBox>
	)
}

export const CreateInfoButton = ({ onClick }) => {
	return (
		<Box
			as="button"
			onClick={onClick}
			bg="transparent"
			h="5"
			border="dashed"
			borderRadius="none"
			mb="1"
			w="100%"
			color="text02"
			fontStyle="italic"
			_hover={{ color: "blue.600hover", shadow: "lg" }}
		>
			+ New Info
		</Box>
	)
}
