import { Header } from "./layout/Header"
import PatientList from "./pages/PatientList"

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

function App() {
	return (
		<>
			<Header pageName="Patient List" />
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
						<p>two!</p>
					</TabPanel>
					<TabPanel>
						<p>three!</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	)
}

export default App
