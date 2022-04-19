import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
} from "@chakra-ui/react"

import React from "react"

export const EditInfoDrawer = ({ isOpen, onClose, patient, problemIndex }) => {
	return (
		<Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				{/* <DrawerHeader>Add {infoType ? infoType : "Info"}</DrawerHeader> */}
				<DrawerBody>
					{/* <InfoTypeRadioGroup infoType={infoType} setInfoType={setInfoType} />
					{typeToComponent[infoType]} */}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}
