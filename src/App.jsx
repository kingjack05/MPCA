import { pageNameAtom } from "./atoms"
import PatientList from "./pages/PatientList"

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { useUpdateAtom } from "jotai/utils"
import { useEffect } from "react"
import { UserTodosOverview } from "./features/todo/pages/UserTodosOverview"

function App() {
	const setPageName = useUpdateAtom(pageNameAtom)

	useEffect(() => {
		setPageName("Main Page")
	}, [setPageName])

	return (
		<>
			<Tabs variant="line" h="100%" bg="background">
				<TabList>
					<Tab>Patients</Tab>
					<Tab>TODOs</Tab>
				</TabList>

				<TabPanels>
					<TabPanel bg="ui03">
						<PatientList />
					</TabPanel>
					<TabPanel>
						<UserTodosOverview />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	)
}

export default App
