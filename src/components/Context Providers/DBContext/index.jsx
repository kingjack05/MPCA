import { createContext, useContext, useEffect, useState } from "react"
import { getDB } from "../../../db"

const Context = createContext()

export const DBContext = ({ children }) => {
	const [DB, setDB] = useState()

	useEffect(() => {
		const loadDB = async () => {
			setDB(await getDB())
		}
		loadDB()
	}, [])

	return <Context.Provider value={{ DB }}>{children}</Context.Provider>
}

export const useDB = () => {
	return useContext(Context)
}
