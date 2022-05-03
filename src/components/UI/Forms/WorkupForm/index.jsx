import { AutosuggestComboBox } from "../../../AutosuggestComboBox"
import { TimeDateInput } from "../../InputWidgets/TimeDateInput"

import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons"
import { Box, Button, Input, Flex, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { Controller, useForm, useFieldArray } from "react-hook-form"

export const WorkupForm = ({
	defaultValues = { time: new Date().toISOString() },
	onSubmit,
	onCancel,
}) => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues })
	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm
		name: "questions",
	})

	return (
		<>
			<Box mx="3" mb="2">
				<form id="Workup" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					<AutosuggestComboBox
						collection="workups"
						placeholder="Workup name (or import from database...)"
						otherInputProps={{ ...register("name", { required: true }) }}
						onSelect={({ questions }) =>
							questions.forEach((question) => append(question))
						}
						limit={3}
						mb="2"
					/>
					{errors.name && <Box color="error">Workup Name is required</Box>}
					<Menu offset={[0, 0]} matchWidth autoSelect={false} variant="carbon">
						<MenuButton
							as={Button}
							variant="primary"
							borderRadius="none"
							w="100%"
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
						</MenuList>
					</Menu>
					{fields.map((item, index) => (
						<Box key={item.id}>
							<Flex direction="column">
								<Flex textStyle="label1" mb="1">
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
							</Flex>
						</Box>
					))}
					<Controller
						control={control}
						name="time"
						render={({ field: { value, onChange } }) => (
							<TimeDateInput value={value} onChange={onChange} />
						)}
					/>
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
