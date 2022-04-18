import {
	ArrowDown,
	ArrowUp,
	LicenseDraft,
	Notebook,
	Pills,
	Chemistry,
	Image,
} from "@carbon/icons-react"
import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Input,
} from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AutosuggestComboBox } from "../../../components/AutosuggestComboBox"
import { medsSchema } from "../../../schema"

export const ProblemDrawer = ({ isOpen, onClose, patient, problemIndex }) => {
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
	const typeToComponent = {
		Workup: <AddWorkup />,
		Logs: <AddLog />,
		Meds: <AddMed onClose={onClose} patient={patient} problemIndex={problemIndex} />,
		Labs: <AddLab />,
		Images: <AddImage />,
	}

	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Add {infoType ? infoType : "Info"}</DrawerHeader>
				<DrawerBody>
					<InfoTypeRadioGroup infoType={infoType} setInfoType={setInfoType} />
					{typeToComponent[infoType]}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

const InfoTypeRadioGroup = ({ infoType, setInfoType }) => {
	const getIconButtonProps = (type) => {
		const color = infoType === type ? "interactive01" : "text03"

		return {
			as: "button",
			p: 1,
			border: "none",
			bg: "transparent",
			onClick: () => {
				setInfoType(type)
			},
			color,
			"aria-label": type,
		}
	}

	return (
		<Flex pl="2">
			<Box {...getIconButtonProps("Workup")}>
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

const AddWorkup = () => {
	return <>Add Workup</>
}

const AddLog = () => {
	return <>Add Log</>
}

const AddMed = ({ onClose, patient, problemIndex }) => {
	const { register, handleSubmit, reset } = useForm()
	const onSubmit = async (data) => {
		await patient.atomicUpdate((oldData) => {
			const info = { category: "Meds", content: data }
			oldData.problems[problemIndex].info.push(info)
			return oldData
		})
	}

	return (
		<>
			<Box mx="3">
				<AutosuggestComboBox
					schema={medsSchema}
					onSelect={({ name, strength, dosage, form }) =>
						reset({ name, strength, dosage, form })
					}
					limit={1}
				/>
				<form id="addMed" onSubmit={handleSubmit(onSubmit)}>
					<Input {...register("name")} placeholder="Name" />
					<Input {...register("strength")} placeholder="Strength" />
					<Input {...register("dosage")} placeholder="Dosage" />
					<Input {...register("form")} placeholder="Form" />
				</form>
			</Box>
			<Flex>
				<Button
					type="submit"
					form="addMed"
					flex="1"
					borderRadius="none"
					p="0"
					variant="primary"
				>
					Save
				</Button>
				<Button onClick={onClose} flex="1" borderRadius="none" bg="ui03" border="none">
					Cancel
				</Button>
			</Flex>
		</>
	)
}

const AddLab = () => {
	return <>Add Lab</>
}

const AddImage = () => {
	return <>Add Image</>
}
