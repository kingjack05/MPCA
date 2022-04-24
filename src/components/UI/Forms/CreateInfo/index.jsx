// Context
import { InfoTypeRadioGroup } from "../../InputWidgets/InfoTypeRadioGroup"
// Components
import { AutosuggestComboBox } from "../../../AutosuggestComboBox"

import { Box, Button, Flex, Input } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const CreateInfo = ({ onSubmit = ({ category, data }) => {}, onCancel }) => {
	const [infoType, setInfoType] = useState("Logs")
	const typeToComponent = {
		Workup: <WorkupFrom />,
		Logs: <LogForm />,
		Meds: <MedForm onSubmit={onSubmit} />,
		Labs: <LabForm />,
		Images: <ImageForm />,
	}

	return (
		<>
			<InfoTypeRadioGroup
				onChange={(type) => {
					setInfoType(type)
				}}
			/>
			{typeToComponent[infoType]}
			<Flex>
				<Button
					type="submit"
					form={infoType}
					flex="1"
					borderRadius="none"
					p="0"
					variant="primary"
				>
					Save
				</Button>
				<Button onClick={onCancel} flex="1" borderRadius="none" bg="ui03" border="none">
					Cancel
				</Button>
			</Flex>
		</>
	)
}

const WorkupFrom = () => {}

const LogForm = () => {}

const MedForm = ({ onSubmit }) => {
	const { register, handleSubmit, reset } = useForm()

	return (
		<>
			<Box mx="3">
				<AutosuggestComboBox
					collection="meds"
					onSelect={({ name, strength, dosage, form }) =>
						reset({ name, strength, dosage, form })
					}
					limit={1}
				/>
				<form
					id="Meds"
					onSubmit={handleSubmit((data) => {
						onSubmit({ category: "Meds", data })
					})}
				>
					<Input {...register("name")} placeholder="Name" />
					<Input {...register("strength")} placeholder="Strength" />
					<Input {...register("form")} placeholder="Form" />
					<Input {...register("usage")} placeholder="Usage" />
				</form>
			</Box>
		</>
	)
}

const LabForm = () => {}

const ImageForm = () => {}
