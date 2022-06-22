import { useDB } from "../../../components/Context Providers/DBContext"

import {
	ArrowDown,
	ArrowUp,
	Export,
	LicenseDraft,
	Notebook,
	Pills,
	Chemistry,
	Image,
} from "@carbon/icons-react"
import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
} from "@chakra-ui/react"
import { useState } from "react"
import { v4 as uuid } from "uuid"
import { LogForm } from "../../../components/UI/Forms/LogForm"
import { MedForm } from "../../../components/UI/Forms/MedForm"
import { LabForm } from "../../../components/UI/Forms/LabForm"
import { WorkupForm } from "../../../components/UI/Forms/WorkupForm"
import { ImageForm } from "../../../components/UI/Forms/ImageForm"

export const ProblemDrawer = ({ isOpen, onClose, patient, problemIndex }) => {
	const { DB } = useDB()
	const reorderProblem = async (patient, problemIndex, direction) => {
		if (direction === "up") {
			await patient.atomicUpdate((oldData) => {
				const problem = oldData.problems[problemIndex]
				oldData.problems.splice(problemIndex, 1)
				oldData.problems.splice(problemIndex - 1, 0, problem)
				return oldData
			})
		} else if (direction === "down") {
			await patient.atomicUpdate((oldData) => {
				const problem = oldData.problems[problemIndex]
				oldData.problems.splice(problemIndex, 1)
				oldData.problems.splice(problemIndex + 1, 0, problem)
				return oldData
			})
		}
	}
	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement="top">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerBody bg="mainTheme">
					<Flex direction="row-reverse">
						<Box
							as="button"
							onClick={async () => {
								const data = { ...patient.problems[problemIndex], _id: uuid() }
								data.info = data.info.map(({ category, content }) => {
									let filteredContent = { ...content }
									delete filteredContent.time
									return {
										category,
										content: filteredContent,
									}
								})
								await DB.templates.insert(data)
								onClose()
							}}
							border="none"
							bg="inherit"
							p="1.5"
						>
							<Export size={32} fill="white" />
						</Box>
						<Box
							as="button"
							onClick={async () => {
								await reorderProblem(patient, problemIndex, "down")
								onClose()
							}}
							border="none"
							bg="inherit"
							p="1.5"
						>
							<ArrowDown size={32} fill="white" />
						</Box>
						<Box
							as="button"
							onClick={async () => {
								await reorderProblem(patient, problemIndex, "up")
								onClose()
							}}
							border="none"
							bg="inherit"
							p="1.5"
						>
							<ArrowUp size={32} fill="white" />
						</Box>
					</Flex>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export const AddInfoDrawer = ({ isOpen, onClose, patient, problemIndex }) => {
	const [infoType, setInfoType] = useState()
	const formWrapperProps = {
		patient,
		problemIndex,
		onClose,
	}
	const typeToComponent = {
		Workups: <CreateWorkupFormWrapper {...formWrapperProps} />,
		Logs: <CreateLogInfoFormWrapper {...formWrapperProps} />,
		Meds: <CreateMedInfoFormWrapper {...formWrapperProps} />,
		Labs: <CreateLabInfoFormWrapper {...formWrapperProps} />,
		Images: <CreateImageFormWrapper {...formWrapperProps} />,
	}

	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader pb="1">Add {infoType ? infoType : "Info"}</DrawerHeader>
				<DrawerBody>
					<InfoTypeRadioGroup value={infoType} onChange={setInfoType} />
					{typeToComponent[infoType]}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export const InfoTypeRadioGroup = ({ value, onChange }) => {
	const getIconButtonProps = (type) => {
		const color = value === type ? "interactive01" : "text03"

		return {
			as: "button",
			p: 1,
			border: "none",
			bg: "transparent",
			onClick: () => {
				onChange(type)
			},
			color,
			"aria-label": type,
		}
	}

	return (
		<Flex px="2" mb="1" justify="space-around">
			<Box {...getIconButtonProps("Workups")}>
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

const CreateWorkupFormWrapper = ({ patient, problemIndex, onClose }) => {
	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Workups", content: data }
			oldData.problems[problemIndex].info.push(info)
			return oldData
		})
		onClose()
	}

	return <WorkupForm onSubmit={onSubmit} onCancel={onClose} />
}

const CreateLogInfoFormWrapper = ({ patient, problemIndex, onClose }) => {
	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Logs", content: data }
			oldData.problems[problemIndex].info.push(info)
			return oldData
		})
		onClose()
	}

	return <LogForm onSubmit={onSubmit} onCancel={onClose} />
}

const CreateMedInfoFormWrapper = ({ patient, problemIndex, onClose }) => {
	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Meds", content: data }
			oldData.problems[problemIndex].info.push(info)
			return oldData
		})
		onClose()
	}

	return <MedForm onSubmit={onSubmit} onCancel={onClose} />
}

const CreateLabInfoFormWrapper = ({ patient, problemIndex, onClose }) => {
	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Labs", content: data }
			oldData.problems[problemIndex].info.push(info)
			return oldData
		})
		onClose()
	}

	return <LabForm onSubmit={onSubmit} onCancel={onClose} />
}

const CreateImageFormWrapper = ({ patient, problemIndex, onClose }) => {
	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Images", content: data }
			oldData.problems[problemIndex].info.push(info)
			return oldData
		})
		onClose()
	}

	return <ImageForm onSubmit={onSubmit} onCancel={onClose} />
}
