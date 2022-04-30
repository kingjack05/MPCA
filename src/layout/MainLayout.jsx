import { pageNameAtom } from "../atoms"

import { Menu as MenuIcon, UserAvatar } from "@carbon/icons-react"
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
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useDisclosure,
} from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { Link, Outlet } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

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
					<MenuIcon size={24} />
				</Box>
				<Box flex="1" textStyle="bodyshort1" color="white">
					{pageName}
				</Box>
				<UserMenu />
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
						<Box as={Link} to="/" layerStyle="hamburgerMenuItem">
							Home
						</Box>
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
									<Box as={Link} to="db/labs" layerStyle="hamburgerMenuItem">
										Labs
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

const UserMenu = () => {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

	return (
		<Menu>
			<MenuButton border="none" bg="transparent" color="white">
				<UserAvatar size={24} />
			</MenuButton>
			<MenuList>
				{isAuthenticated ? (
					<>
						<MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
							Logout
						</MenuItem>
					</>
				) : (
					<MenuItem onClick={() => loginWithRedirect()}>Login</MenuItem>
				)}
			</MenuList>
		</Menu>
	)
}

export const MainLayout = () => {
	return (
		<>
			<Flex height="100%" direction="column">
				<Header />
				<Box flex="1">
					<Outlet />
				</Box>
			</Flex>
		</>
	)
}
