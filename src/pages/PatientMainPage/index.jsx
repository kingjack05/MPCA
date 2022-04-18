import ProblemsList from "./ProblemsList"

import { Box, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { usePatient } from "../../queries/usePatient"
import { ArrowLeft } from "@carbon/icons-react"

function PatientMainPage() {
	const params = useParams()
	const { patient } = usePatient({ id: params._id })
	return (
		<>
			<Header patient={patient} />
			<Tabs variant="line">
				<TabList>
					<Tab>Problems</Tab>
					<Tab>Logs</Tab>
					<Tab>Meds</Tab>
					<Tab>Labs</Tab>
				</TabList>

				<TabPanels>
					<TabPanel bg="background">
						<ProblemsList patient={patient} />
					</TabPanel>
					<TabPanel>
						<p>Logs!</p>
					</TabPanel>
					<TabPanel>
						<p>Meds!</p>
					</TabPanel>
					<TabPanel>
						<p>Labs!</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	)
}

function Header({ patient }) {
	return (
		<Box bgColor="mainTheme">
			<Flex as="button" bgColor="inherit" m="0" p="1" border="none" color="gray.400">
				<ArrowLeft size={16} />
				<Text textStyle="label1" display="inline" m="0">
					Patients List
				</Text>
			</Flex>
			<Flex ml="3">
				<Flex direction="column" color="white">
					<Box textStyle="h2">{patient?.name}</Box>
					<Text textStyle="label1" my="1">
						Extra info
					</Text>
				</Flex>
			</Flex>
		</Box>
	)
}

export default PatientMainPage
