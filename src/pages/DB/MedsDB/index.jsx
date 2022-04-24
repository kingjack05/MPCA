import { pageNameAtom } from "../../../atoms"
import CRUDTable from "../../../components/CRUDTable"
import { medsSchema } from "../../../schema"

import { useUpdateAtom } from "jotai/utils"
import { useEffect } from "react"
import { Box } from "@chakra-ui/react"

const MedsDB = () => {
	const setPageName = useUpdateAtom(pageNameAtom)

	useEffect(() => {
		setPageName("Manage Database")
	}, [setPageName])

	return (
		<>
			<Box fontSize="20px" mt="2" mb="3" pl="2">
				Meds
			</Box>
			<CRUDTable schema={medsSchema} />
		</>
	)
}

export default MedsDB
