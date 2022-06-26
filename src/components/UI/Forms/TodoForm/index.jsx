import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export const TodoForm = ({ defaultValues = {}, onSubmit, onCancel }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues })
	return (
		<>
			<Box mx="3" mb="3">
				<form id="Todo" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					<Input {...register("title")} placeholder="Todo" mt="2" />
					<Text>{errors.todo ? "Todo is required." : " "}</Text>
				</form>
			</Box>
			<Flex>
				<Button
					type="submit"
					form="Todo"
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
