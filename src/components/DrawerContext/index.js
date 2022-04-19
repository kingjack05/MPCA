import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	useDisclosure,
} from "@chakra-ui/react"
import React, { useContext, useState } from "react"

const Context = React.createContext()

export function DrawerContext({ children }) {
	const [header, setHeader] = useState("")
	const [component, setComponent] = useState(<></>)
	const { isOpen, onOpen: onOpenDrawer, onClose } = useDisclosure()

	return (
		<>
			<Context.Provider value={{ onOpenDrawer, setHeader, setComponent }}>
				{children}
			</Context.Provider>
			<Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{header}&nbsp;</DrawerHeader>
					<DrawerBody>{component}</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export function useDrawer() {
	return useContext(Context)
}
