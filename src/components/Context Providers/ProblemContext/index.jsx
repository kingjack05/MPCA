import { createContext, useContext } from "react"

const Context = createContext()

export const ProblemContext = ({ problemIndex, children }) => {
	return <Context.Provider value={{ problemIndex }}>{children}</Context.Provider>
}

export const useProblemContext = () => {
	return useContext(Context)
}
