import { pageNameAtom } from "../../../atoms"
import ProblemUI from "../../../components/UI/ProblemUI"

import { useUpdateAtom } from "jotai/utils"
import { useEffect, useMemo, useRef, useState } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { getDB } from "../../../db"
import { SearchBar } from "../../../components/UI/SearchBar/SearchBar"

export const TemplatesDB = () => {
	const setPageName = useUpdateAtom(pageNameAtom)
	const DBRef = useRef()
	const [templates, setTemplates] = useState([])
	const [search, setSearch] = useState("")
	const [filteredTemplates, setFilteredTemplates] = useState([])
	useMemo(
		() => setFilteredTemplates(templates.filter(({ problem }) => problem.includes(search))),
		[search, templates]
	)

	useEffect(() => {
		setPageName("Manage Database")
	}, [setPageName])

	useEffect(() => {
		const fetchData = async () => {
			DBRef.current = await getDB()
			const templatesQuery = DBRef.current.templates.find()
			const templatesInit = await templatesQuery.exec()
			setTemplates(templatesInit)
			const sub = templatesQuery.$.subscribe((templates) => {
				if (!templates) {
					return []
				}
				setTemplates(templates)
			})
			return () => sub.unsubscribe()
		}
		fetchData()
	}, [])

	return (
		<Box>
			<Box fontSize="20px" mt="2" mb="3" pl="2">
				Templates
			</Box>
			<Flex direction="row-reverse">
				<SearchBar
					onChange={(e) => {
						setSearch(e.target.value)
					}}
				/>
			</Flex>
			{filteredTemplates?.map((template, index) => (
				<div key={index}>
					<ProblemUI
						data={template}
						onCreateInfo={() => {
							console.log("Clicked")
						}}
					/>
					<div> {JSON.stringify(template)})</div>
				</div>
			))}
		</Box>
	)
}
