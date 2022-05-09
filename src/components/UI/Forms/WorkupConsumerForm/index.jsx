import { Box, Button, Input, Flex, CheckboxGroup, Checkbox } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { TipTapRenderer } from "../../InputWidgets/TipTapEditor"

/**
 * @typedef Props
 * @property {import("../../../../schema").Workup} defaultValues
 * @property {(data)=>{}} onSubmit
 * @property {()=>{}} onCancel
 *
 * @param {Props}
 * @returns
 */
export const WorkupConsumerForm = ({ defaultValues, onSubmit, onCancel }) => {
	const { control, register, handleSubmit } = useForm({ defaultValues })
	const { fields } = useFieldArray({
		control, // control props comes from useForm
		name: "questions",
	})
	console.dir(defaultValues)
	return (
		<>
			<Box mx="3" mb="2">
				<form id="WorkupConsumer" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					{fields.map((item, index) => {
						if (item.category === "Yes/No") {
							return (
								<Flex direction="column" key={item.id}>
									<Flex alignItems="center" mb="2">
										<Box flex="1" mr="2" textStyle="bodyShort1">
											{item.question}
										</Box>
										<Controller
											control={control}
											name={`questions.${index}.answer`}
											render={({ field: { onChange, value } }) => (
												<YesNoRadio value={value} onChange={onChange} />
											)}
										/>
									</Flex>
									{item.annotation && (
										<>
											<TipTapRenderer content={item.annotation} />
										</>
									)}
								</Flex>
							)
						} else if (item.category === "Text") {
							return (
								<Flex key={item.id} direction="column" mb="2">
									<Box textStyle="bodyShort1" mb="6px">
										{item.question}
									</Box>
									<Input
										variant="carbon"
										{...register(`questions.${index}.answer`)}
									/>
									{item.annotation && (
										<>
											<TipTapRenderer content={item.annotation} />
										</>
									)}
								</Flex>
							)
						} else if (item.category === "Single Select") {
							return (
								<Flex direction="column" key={item.id}>
									<Flex alignItems="center" mb="2">
										<Box flex="1" textStyle="bodyShort1">
											{item.question}
										</Box>
										<Controller
											control={control}
											name={`questions.${index}.answer`}
											render={({ field: { onChange, value } }) => (
												<SingleSelect
													value={value}
													onChange={onChange}
													options={item.options}
												/>
											)}
										/>
									</Flex>
									{item.annotation && (
										<TipTapRenderer content={item.annotation} />
									)}
								</Flex>
							)
						} else if (item.category === "Multiple Select") {
							return (
								<Flex direction="column" key={item.id}>
									<Flex alignItems="center" mb="2">
										<Box flex="1" textStyle="bodyShort1">
											{item.question}
										</Box>
										<Controller
											control={control}
											name={`questions.${index}.answer`}
											render={({ field: { onChange, value } }) => (
												<MultipleSelect
													value={value}
													onChange={onChange}
													options={item.options}
												/>
											)}
										/>
									</Flex>
									{item.annotation && (
										<TipTapRenderer content={item.annotation} />
									)}
								</Flex>
							)
						} else return null
					})}
				</form>
			</Box>
			<Flex>
				<Button
					type="submit"
					form="WorkupConsumer"
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

const YesNoRadio = ({ value, onChange }) => {
	const [answer, setAnswer] = useState(value)

	useEffect(() => {
		onChange(answer)
	}, [answer, onChange])

	const propGetter = (isActive) => {
		const bg = isActive ? "interactive01" : "ui01"
		const color = isActive ? "white" : "text01"

		return {
			bg,
			color,
			alignItems: "center",
			justifyContent: "center",
			h: "6",
			w: "8",
			border: "none",
			borderRadius: "none",
		}
	}

	return (
		<>
			<Flex
				onClick={() => setAnswer("Yes")}
				{...propGetter(answer === "Yes")}
				borderRight={answer ? "" : "1px solid #E0E0E0"}
			>
				Yes
			</Flex>
			<Flex onClick={() => setAnswer("No")} {...propGetter(answer === "No")}>
				No
			</Flex>
		</>
	)
}

const SingleSelect = ({ value, onChange, options }) => {
	const [answer, setAnswer] = useState(value)

	useEffect(() => {
		onChange(answer)
	}, [answer, onChange])

	const propGetter = (isActive) => {
		const bg = isActive ? "interactive01" : "ui01"
		const color = isActive ? "white" : "text01"

		return {
			bg,
			color,
			alignItems: "center",
			justifyContent: "center",
			h: "5",
			w: "100%",
			border: "none",
			borderBottom: "1px solid #E0E0E0",
			borderRadius: "none",
			_last: {
				borderBottom: "1px solid transparent",
			},
		}
	}

	return (
		<Flex direction="column" flex="1">
			{options.map((item, index) => (
				<Flex
					key={index}
					onClick={() => setAnswer(item.optionValue)}
					{...propGetter(answer === item.optionValue)}
				>
					{item.optionValue}
				</Flex>
			))}
		</Flex>
	)
}

const MultipleSelect = ({ value, onChange, options }) => {
	const [answer, setAnswer] = useState(value)

	useEffect(() => {
		onChange(answer)
	}, [answer, onChange])

	return (
		<Flex direction="column" flex="1">
			<CheckboxGroup value={answer} onChange={(data) => setAnswer(data)}>
				{options.map((item, index) => (
					<Flex key={index} alignItems="center" h="5" w="100%">
						<Checkbox
							value={item.optionValue}
							color="text02"
							_checked={{ color: "#161616" }}
						>
							{item.optionValue}
						</Checkbox>
					</Flex>
				))}
			</CheckboxGroup>
		</Flex>
	)
}
