import { Search } from "@carbon/icons-react"
import { Box, Flex, Input } from "@chakra-ui/react"
import { useState } from "react"

export const SearchBar = ({ onChange }) => {
	const [searchExpanded, setSearchExpanded] = useState(false)
	return (
		<Flex
			as="button"
			flex={searchExpanded ? "1" : ""}
			onFocus={() => {
				if (!searchExpanded) {
					setSearchExpanded(true)
				}
			}}
			bg="transparent"
			alignItems="center"
			border="none"
		>
			<Box>
				<Search size={20} />
			</Box>
			<Input
				variant="carbon"
				display={searchExpanded ? "" : "none"}
				onChange={onChange}
				onBlur={() => {
					setSearchExpanded(false)
				}}
			/>
		</Flex>
	)
}
