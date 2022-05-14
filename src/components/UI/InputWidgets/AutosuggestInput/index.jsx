import { Box, Flex, Input, UnorderedList } from "@chakra-ui/react"
import { useCombobox } from "downshift"

/**
 * @typedef AutosuggestInputProps
 * @property {[]} items
 * @property {({inputValue:string})=>{}} onInputValueChange
 * @property {(selectedItem)=>{}} onSelect
 * @property {(item)=>string} itemToString Return the string equivalent of the item which will be used for displaying the item in the <input> once selected
 * @property {string} placeholder
 */

// Style input and dropdown, and resurface relevant useCombobox params
/**
 * @param {AutosuggestInputProps} AutosuggestInputProps
 */
export const AutosuggestInput = ({
	items,
	onInputValueChange,
	onSelect,
	itemToString = (item) => item.name || "",
	placeholder,
	inputProps,
	itemContainerProps = {
		h: "5",
		alignItems: "center",
		borderTop: "1px solid #E0E0E0",
		_hover: { background: "hoverui" },
	},
	itemRenderProp = (item, index) => <Box>{item.name}</Box>,
	...props
}) => {
	const { isOpen, getComboboxProps, getInputProps, getMenuProps, getItemProps } = useCombobox({
		items,
		itemToString,
		onInputValueChange,
		onSelectedItemChange({ selectedItem }) {
			onSelect(selectedItem)
		},
	})

	return (
		<Box position="relative" {...props}>
			<div {...getComboboxProps()}>
				<Input {...getInputProps({ ...inputProps })} placeholder={placeholder} />
			</div>
			<UnorderedList
				{...getMenuProps({
					position: "absolute",
					w: "100%",
					m: "0",
					px: "2",
					bg: "ui01",
					zIndex: "popover",
				})}
			>
				{isOpen &&
					items.map((item, index) => (
						<Flex key={index} {...getItemProps({ item, index, ...itemContainerProps })}>
							{itemRenderProp(item, index)}
						</Flex>
					))}
			</UnorderedList>
		</Box>
	)
}
