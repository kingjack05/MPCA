import "./index.css"

import * as serviceWorkerRegistration from "./serviceWorkerRegistration"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { DrawerContext } from "./components/DrawerContext"
import PatientMainPage from "./pages/PatientMainPage"
import React from "react"
import Test from "./pages/Test"
import { createRoot } from "react-dom/client"
import theme from "./ds/theme"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme} resetCSS={false}>
			<DrawerContext>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/patient/:_id" element={<PatientMainPage />} />
						<Route path="/test" element={<Test />} />
					</Routes>
				</BrowserRouter>
			</DrawerContext>
		</ChakraProvider>
	</React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
