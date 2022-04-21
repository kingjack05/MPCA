import { pageNameAtom } from "../../../atoms"

import { useUpdateAtom } from "jotai/utils"
import { useEffect } from "react"

export const TemplatesDB = () => {
	const setPageName = useUpdateAtom(pageNameAtom)

	useEffect(() => {
		setPageName("Templates Database")
	}, [setPageName])

	return <div>TemplatesDB</div>
}
