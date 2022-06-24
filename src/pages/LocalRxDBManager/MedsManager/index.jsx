import { pageNameAtom } from "../../../atoms"
import CRUDTable from "../../../components/CRUDTable"
import { medsSchema } from "../../../schema.ts"

import { useUpdateAtom } from "jotai/utils"
import { useEffect } from "react"
import { Box } from "@chakra-ui/react"

export const MedsManager = () => {
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
