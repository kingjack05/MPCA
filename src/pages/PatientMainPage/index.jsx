import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"

import { ArrowLeft } from "@carbon/icons-react"
import { PatientContext } from "../../components/Context Providers/PatientContext"
import ProblemsList from "./ProblemsList"
import { useNavigate, useParams } from "react-router-dom"
import { usePatient } from "../../queries/usePatient"
import { useDocumentTitle } from "../../hooks/useDocumentTitle"
import { TodosList } from "./TodosList"

function PatientMainPage() {
	const params = useParams()
	const { patient } = usePatient({ id: params._id })

	return (
		<>
			<PatientContext id={params._id}>
				<Flex direction="column" h="100%">
					<Header patient={patient} />
					<Tabs variant="line" flex="1" bg="background">
						<TabList>
							<Tab>ToDo</Tab>
							<Tab>Problems</Tab>
							<Tab>Logs</Tab>
							<Tab>Meds</Tab>
							<Tab>Labs</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
								<TodosList patient={patient} patientID={params._id} />
							</TabPanel>
							<TabPanel>
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
				</Flex>
			</PatientContext>
		</>
	)
}

function Header({ patient }) {
	const navigate = useNavigate()
	useDocumentTitle(patient?.name)

	return (
		<Box bgColor="gray.900">
			<Flex
				as="button"
				onClick={() => {
					navigate("/")
				}}
				bgColor="inherit"
				m="0"
				p="1"
				border="none"
				color="gray.400"
			>
				<ArrowLeft size={16} />
				<Text textStyle="label1" display="inline" m="0">
					Patients List
				</Text>
			</Flex>
			<Flex ml="3">
				<Flex direction="column" color="white">
					<Box textStyle="h2">{patient?.name}</Box>
					<Text textStyle="label1" my="1">
						{patient?.age ? patient?.age + " y/o " + patient?.gender : " "}
						{patient?.weight ? ", " + patient?.weight + ", " + patient?.height : ""}
					</Text>
				</Flex>
			</Flex>
		</Box>
	)
}

export default PatientMainPage
