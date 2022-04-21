import { pageNameAtom } from "../atoms"

import { Menu } from "@carbon/icons-react"
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Drawer,
	DrawerBody,
	DrawerContent,
	Flex,
	useDisclosure,
} from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import React from "react"
import { Link, Outlet } from "react-router-dom"

const Header = () => {
	const pageName = useAtomValue(pageNameAtom)
	const {
		isOpen: isOpenHamburgerMenu,
		onOpen: onOpenHamburgerMenu,
		onClose: onCloseHamburgerMenu,
	} = useDisclosure()

	return (
		<>
			<Flex align="center" direction="row" w="100vw" h={["4", "6"]} bg="gray.1000">
				<Box
					as="button"
					onClick={onOpenHamburgerMenu}
					border="none"
					bg="transparent"
					color="white"
				>
					<Menu size={32} />{" "}
				</Box>
				<Box textStyle="bodyshort1" color="white">
					{pageName}
				</Box>
			</Flex>
			<HamburgerMenu isOpen={isOpenHamburgerMenu} onClose={onCloseHamburgerMenu} />
		</>
	)
}

const HamburgerMenu = ({ isOpen, onClose }) => {
	return (
		<>
			<Drawer placement="left" isOpen={isOpen} onClose={onClose}>
				<DrawerContent>
					<DrawerBody ml="2" mt="3">
						<Accordion allowToggle>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											Manage Database
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									<Box as={Link} to="db/templates" layerStyle="hamburgerMenuItem">
										Templates
									</Box>
									<Box as={Link} to="db/meds" layerStyle="hamburgerMenuItem">
										Meds
									</Box>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export const MainLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
