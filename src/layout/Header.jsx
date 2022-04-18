import { Box, Flex } from "@chakra-ui/react"
import React from "react"

export const Header = ({ pageName }) => {
	return (
		<Flex align="center" direction="row" w="100vw" h={["4", "6"]} bg="gray.1000">
			<Box textStyle="bodyshort1" color="white">
				{pageName}
			</Box>
		</Flex>
	)
}
