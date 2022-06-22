import App from "./App"
import { DBContext } from "./components/Context Providers/DBContext"
import { DrawerContext } from "./components/Context Providers/DrawerContext"
import theme from "./ds/theme"
import "./index.css"
import { MainLayout } from "./layout/MainLayout"
import { LabsManager } from "./pages/LocalRxDBManager/LabsManager"
import { MedsManager } from "./pages/LocalRxDBManager/MedsManager"
import { TemplatesManager } from "./pages/LocalRxDBManager/TemplatesManager"
import { WorkupsManager } from "./pages/LocalRxDBManager/WorkupsManager"
import PatientMainPage from "./pages/PatientMainPage"
// import Test from "./pages/Test"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

import { Auth0Provider } from "@auth0/auth0-react"
import { ChakraProvider } from "@chakra-ui/react"
import { defineCustomElements } from "@ionic/pwa-elements/loader"
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"

const container = document.getElementById("root")
const root = createRoot(container)

const queryClient = new QueryClient()

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme} resetCSS={false}>
				<Auth0Provider
					domain="dev-yu40ug8e.us.auth0.com"
					clientId="Xh51UL907wUZik0qZLKL2a6xat7Qy6BF"
					redirectUri={window.location.origin}
					audience="kingjack05@gmail.com"
				>
					<DBContext>
						<DrawerContext>
							<BrowserRouter>
								<Routes>
									<Route element={<MainLayout />}>
										<Route path="/" element={<App />} />
										<Route path="dbManager">
											<Route path="labs" element={<LabsManager />} />
											<Route path="meds" element={<MedsManager />} />
											<Route
												path="templates"
												element={<TemplatesManager />}
											/>
											<Route path="workups" element={<WorkupsManager />} />
										</Route>
									</Route>
									<Route path="/patient/:_id" element={<PatientMainPage />} />
									{/* <Route path="/test" element={<Test />} /> */}
								</Routes>
							</BrowserRouter>
						</DrawerContext>
					</DBContext>
				</Auth0Provider>
			</ChakraProvider>
		</QueryClientProvider>
	</React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

defineCustomElements(window)
