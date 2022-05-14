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
import { useLongPress } from "use-long-press"

// onEditInfo and onDeleteInfo contain parameter "index"
export default function ProblemUI({
	data,
	onLongPress,
	onEditProblem,
	onDeleteProblem,
	onCreateInfo,
	onUpdateInfo = (index) => {},
	onDeleteInfo = (index) => {},
}) {
	const bind = useLongPress(onLongPress)
	const InfoToComnponent = ({ category, content }, index) => {
		const typeToComponent = {
			Meds: (
				<MedInfoUI
					key={index}
					data={content}
					onEdit={() => onUpdateInfo(index)}
					onDelete={() => onDeleteInfo(index)}
				/>
			),
		}
		return typeToComponent[category]
	}

	return (
		<>
			<SwipeEditBox onEdit={onEditProblem} onDelete={onDeleteProblem} w="100%">
				<Accordion defaultIndex={[0]} allowMultiple>
					<AccordionItem>
						<h2>
							<AccordionButton
								{...bind}
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
							<AddInfo onClick={onCreateInfo} />
							{data.info.map(InfoToComnponent)}
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</SwipeEditBox>
		</>
	)
}

function AddInfo({ onClick }) {
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
