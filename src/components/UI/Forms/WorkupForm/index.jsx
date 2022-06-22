import { AutosuggestComboBox } from "../../../AutosuggestComboBox"
import { TimeDateInput } from "../../InputWidgets/TimeDateInput"

import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons"
import {
	Box,
	Button,
	Input,
	Flex,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	UnorderedList,
	ListItem,
	Show,
} from "@chakra-ui/react"
import { Controller, useForm, useFieldArray } from "react-hook-form"
import { useState } from "react"
import { TipTapEditor } from "../../InputWidgets/TipTapEditor"

export const WorkupForm = ({
	defaultValues = { time: new Date().toISOString() },
	onSubmit,
	onCancel,
	options = {
		withTime: true,
	},
}) => {
	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		getValues,
	} = useForm({ defaultValues })
	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm
		name: "questions",
	})

	const questionsForm = (item, index) => (
		<Box key={item.id}>
			<Flex direction="column" mb="1">
				<Flex textStyle="label1">
					<Box flex="1">Question {index + 1}</Box>
					<Box>({item.category})</Box>
				</Flex>
				<Flex>
					<Input flex="1" {...register(`questions.${index}.question`)} />
					<Box
						as="button"
						border="none"
						bg="transparent"
						px="14px"
						onClick={() => remove(index)}
					>
						<CloseIcon w="1.5" h="1.5" />
					</Box>
				</Flex>
				<Show above="sm">
					<AnnotationFieldController
						control={control}
						name={`questions.${index}.annotation`}
					/>
				</Show>
				{(item.category === "Single Select" || item.category === "Multiple Select") && (
					<OptionsFieldArray
						control={control}
						register={register}
						questionIndex={index}
					/>
				)}
			</Flex>
		</Box>
	)

	return (
		<>
			<Box mx="3" mb="2">
				<form id="Workup" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					<AutosuggestComboBox
						collection="workups"
						placeholder="Workup name (or import from database...)"
						otherInputProps={{ ...register("name", { required: true }) }}
						onSelect={({ generalComments, questions }) => {
							questions.forEach((question) => append(question))
							setValue("generalComments", generalComments)
							console.log(getValues("generalComments"))
						}}
						limit={3}
						mb="2"
					/>
					{errors.name && <Box color="error">Workup Name is required</Box>}
					<TipTapFieldController
						control={control}
						name="generalComments"
						text="Comments..."
					/>

					<Menu offset={[0, 0]} matchWidth autoSelect={false} variant="carbon">
						<MenuButton
							as={Button}
							variant="primary"
							borderRadius="none"
							w="100%"
							mt="2"
							mb="2"
							rightIcon={<ChevronDownIcon />}
						>
							Add Question...
						</MenuButton>
						<MenuList>
							<MenuItem onClick={() => append({ question: "", category: "Text" })}>
								Text
							</MenuItem>
							<MenuItem onClick={() => append({ question: "", category: "Yes/No" })}>
								Yes/No
							</MenuItem>
							<MenuItem
								onClick={() =>
									append({ question: "", category: "Single Select", options: [] })
								}
							>
								Single Select
							</MenuItem>
							<MenuItem
								onClick={() =>
									append({
										question: "",
										category: "Multiple Select",
										options: [],
									})
								}
							>
								Multiple Select
							</MenuItem>
						</MenuList>
					</Menu>
					{fields.map(questionsForm)}
					{options.withTime && (
						<Controller
							control={control}
							name="time"
							render={({ field: { value, onChange } }) => (
								<TimeDateInput value={value} onChange={onChange} />
							)}
						/>
					)}
				</form>
			</Box>
			<Flex>
				<Button
					type="submit"
					form="Workup"
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

const AnnotationFieldController = ({ control, name }) => {
	const [annotateToggle, setAnnotateToggle] = useState(false)
	return (
		<>
			<Box
				onClick={() => {
					setAnnotateToggle((prev) => !prev)
				}}
				color="gray.700"
				fontStyle="italic"
			>
				Annotate...
			</Box>
			{annotateToggle && (
				<Controller
					control={control}
					name={name}
					render={({ field: { value, onChange } }) => (
						<TipTapEditor
							value={value}
							placeholder="Annotation..."
							onChange={onChange}
						/>
					)}
				/>
			)}
		</>
	)
}

const TipTapFieldController = ({ control, name, text = "", placeholder = "" }) => {
	const [annotateToggle, setAnnotateToggle] = useState(false)
	return (
		<>
			<Box
				onClick={() => {
					setAnnotateToggle((prev) => !prev)
				}}
			>
				{text}
			</Box>
			{annotateToggle && (
				<Controller
					control={control}
					name={name}
					render={({ field: { value, onChange } }) => (
						<TipTapEditor value={value} placeholder={placeholder} onChange={onChange} />
					)}
				/>
			)}
		</>
	)
}

const OptionsFieldArray = ({ control, register, questionIndex }) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `questions.${questionIndex}.options`,
	})
	return (
		<Flex direction="column" mt="1" pl="1">
			<UnorderedList pl="0">
				{fields.map((item, index) => (
					<ListItem key={item.id} mb="1" color="gray.700">
						<Flex>
							<Input
								{...register(
									`questions.${questionIndex}.options.${index}.optionValue`
								)}
								color="gray.700"
							/>
							<Box
								onClick={() => remove(index)}
								as="button"
								border="none"
								bg="transparent"
								px="14px"
								flexShrink="0"
							>
								<CloseIcon w="1.5" h="1.5" color="gray.700" />
							</Box>
						</Flex>
					</ListItem>
				))}
			</UnorderedList>
			<Flex
				onClick={() => {
					append({ optionValue: "option" })
				}}
				bg="transparent"
				h="5"
				border="dashed"
				borderRadius="none"
				w="100%"
				color="text02"
				fontStyle="italic"
				alignItems="center"
				justifyContent="center"
				_hover={{ color: "blue.600hover", shadow: "lg" }}
			>
				+ Add Option
			</Flex>
		</Flex>
	)
}
