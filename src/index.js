import App from "./App"
import { DBContext } from "./components/Context Providers/DBContext"
import { DrawerContext } from "./components/Context Providers/DrawerContext"
import theme from "./ds/theme"
import "./index.css"
import MedsDB from "./pages/DB/MedsDB"
import PatientMainPage from "./pages/PatientMainPage"
import Test from "./pages/Test"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./layout/MainLayout"
import { TemplatesDB } from "./pages/DB/TemplatesDB"
import { Auth0Provider } from "@auth0/auth0-react"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
	<React.StrictMode>
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
									<Route path="db">
										<Route path="templates" element={<TemplatesDB />} />
										<Route path="meds" element={<MedsDB />} />
									</Route>
								</Route>
								<Route path="/patient/:_id" element={<PatientMainPage />} />
								<Route path="/test" element={<Test />} />
							</Routes>
						</BrowserRouter>
					</DrawerContext>
				</DBContext>
			</Auth0Provider>
		</ChakraProvider>
	</React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
