import { TimeDateInput } from "../../InputWidgets/TimeDateInput"

import { Box, Button, Flex, Input } from "@chakra-ui/react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { AutosuggestInput } from "../../InputWidgets/AutosuggestInput"
import { medFuzzySearch } from "../../../../services/localRxDB/fuzzySearch"

export const MedForm = ({
	defaultValues = { time: new Date().toISOString() },
	onSubmit,
	onCancel,
	options = {
		withTime: true,
	},
}) => {
	const { register, handleSubmit, reset, control } = useForm({
		defaultValues,
	})

	const [items, setItems] = useState([])
	const search = async (searchTerm) => {
		let searchResults = await medFuzzySearch(searchTerm)
		setItems(searchResults)
	}

	return (
		<>
			<Box mx="3" mb="3">
				<form id="editMed" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					<AutosuggestInput
						items={items}
						onInputValueChange={({ inputValue }) => {
							search(inputValue)
						}}
						placeholder="Med name (or import from database...)"
						inputProps={{ ...register("name", { required: true }) }}
						itemRenderProp={(item, index) => (
							<>
								<Box>{item.name}&nbsp;</Box>
								<Box textStyle="tertiaryText">
									{item.strength}, {item.form}, {item.usage}
								</Box>
							</>
						)}
						onSelect={({ strength, form, usage }) => reset({ strength, form, usage })}
						limit={5}
						mb="2"
					/>
					<Input {...register("strength")} placeholder="Strength" />
					<Input {...register("form")} placeholder="Form" />
					<Input {...register("usage")} placeholder="Usage" />
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
					form="editMed"
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
