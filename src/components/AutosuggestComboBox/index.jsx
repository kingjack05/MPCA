import { useState } from "react"
import { useCombobox } from "downshift"
import { useDebounce } from "../../hooks/utility/useDebounce"
import { getDB } from "../../db"
import { Box, Flex, Input, UnorderedList } from "@chakra-ui/react"

export const AutosuggestComboBox = ({ collection, fieldName = "name", onSelect, limit }) => {
	const [items, setItems] = useState([])

	const {
		isOpen,
		inputValue,
		getComboboxProps,
		getInputProps,
		getMenuProps,
		getItemProps,
	} = useCombobox({
		items,
		itemToString: (item) => item[fieldName] || "",
		onSelectedItemChange({ selectedItem }) {
			onSelect(selectedItem)
		},
	})
	useDebounce(
		async () => {
			const value = inputValue
			if (value.length <= 2) return
			const regexp = new RegExp(`\\b${value}`, "i")
			const DB = await getDB()
			const search = { [fieldName]: { $regex: regexp } }
			const query = DB[collection]
				.find()
				.where(search)
				// .where({ name: { $regex: regexp } })
				.limit(limit)
			const results = await query.exec()
			setItems(results)
		},
		500,
		[inputValue]
	)

	return (
		<Box position="relative">
			<div {...getComboboxProps()}>
				<Input
					{...getInputProps()}
					placeholder={fieldName[0].toUpperCase() + fieldName.substring(1)}
				/>
			</div>
			<UnorderedList
				{...getMenuProps()}
				position="absolute"
				w="100%"
				m="0"
				px="2"
				bg="ui01"
				zIndex="popover"
			>
				{isOpen &&
					items.map((item, index) => (
						<Flex
							key={index}
							{...getItemProps({ item, index })}
							h="5"
							alignItems="center"
							borderTop="1px solid #E0E0E0"
							_hover={{ background: "hoverui" }}
							// _notLast={{ borderBottom: "1px solid #E0E0E0" }}
						>
							<Box minW={["312px"]}>{item[fieldName]}</Box>
						</Flex>
					))}
			</UnorderedList>
		</Box>
	)
}
