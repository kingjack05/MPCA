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
	const { isOpen, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure()

	return (
		<>
			<Context.Provider value={{ onOpenDrawer, onCloseDrawer, setHeader, setComponent }}>
				{children}
				<Drawer isOpen={isOpen} onClose={onCloseDrawer} placement="bottom">
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>{header}&nbsp;</DrawerHeader>
						<DrawerBody>{component}</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Context.Provider>
		</>
	)
}

export function useDrawer() {
	return useContext(Context)
}
