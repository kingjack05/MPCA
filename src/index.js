import App from "./App"
import { DBContext } from "./components/Context Providers/DBContext"
import { DrawerContext } from "./components/DrawerContext"
import theme from "./ds/theme"
import "./index.css"
import PatientMainPage from "./pages/PatientMainPage"
import Test from "./pages/Test"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme} resetCSS={false}>
			<DBContext>
				<DrawerContext>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<App />} />
							<Route path="/patient/:_id" element={<PatientMainPage />} />
							<Route path="/test" element={<Test />} />
						</Routes>
					</BrowserRouter>
				</DrawerContext>
			</DBContext>
		</ChakraProvider>
	</React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
