import { pageNameAtom } from "./atoms"
import PatientList from "./pages/PatientList"

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { useUpdateAtom } from "jotai/utils"
import { useEffect } from "react"

function App() {
	const setPageName = useUpdateAtom(pageNameAtom)

	useEffect(() => {
		setPageName("Main Page")
	}, [setPageName])

	return (
		<>
			<Tabs variant="line">
				<TabList>
					<Tab>Patients</Tab>
					<Tab>TODOs</Tab>
					<Tab>Temp</Tab>
				</TabList>

				<TabPanels>
					<TabPanel bg="ui03">
						<PatientList />
					</TabPanel>
					<TabPanel>
						<p>Todos</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	)
}

export default App
