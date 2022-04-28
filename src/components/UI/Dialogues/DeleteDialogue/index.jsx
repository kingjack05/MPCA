import { Button, Box, Flex, Text } from "@chakra-ui/react"

export const DeleteDialogue = ({ itemName, onDelete, onCancel }) => {
	return (
		<>
			<Box mx="3" mb="3">
				Are you sure you want to delete{" "}
				<Text display="inline-block" textStyle="h2">
					{itemName}
				</Text>{" "}
				?
			</Box>
			<Flex>
				<Button onClick={onDelete} flex="1" borderRadius="none" p="0" variant="danger">
					Delete
				</Button>
				<Button onClick={onCancel} flex="1" borderRadius="none" bg="ui03" border="none">
					Cancel
				</Button>
			</Flex>
		</>
	)
}
