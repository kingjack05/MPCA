import { pageNameAtom } from "../../../atoms"
import { useDrawer } from "../../../components/Context Providers/DrawerContext"
import { DeleteDialogue } from "../../../components/UI/Dialogues/DeleteDialogue"
import { SearchBar } from "../../../components/UI/SearchBar/SearchBar"
import { SwipeEditAndLongPressBox } from "../../../components/UI/SwipeEditAndLongPressBox"
import { getDB } from "../../../db"

import { useUpdateAtom } from "jotai/utils"
import { useEffect, useState } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { WorkupForm } from "../../../components/UI/Forms/WorkupForm"

export const WorkupsManager = () => {
	const setPageName = useUpdateAtom(pageNameAtom)
	useEffect(() => {
		setPageName("Manage Database")
	}, [setPageName])

	const { onOpenDrawer, setHeader, setComponent } = useDrawer()

	const { data, status } = useQuery("localWorkups", fetchLocalWorkups)

	const [search, setSearch] = useState("")
	const filteredWorkups =
		status === "success" ? data.filter(({ name }) => name.includes(search)) : []

	if (status === "error") {
		return <>Error!</>
	}

	return (
		<Box>
			<Box fontSize="20px" mt="2" mb="1" pl="2">
				Workups
			</Box>
			<Flex direction="row-reverse" h="5">
				<SearchBar
					onChange={(e) => {
						setSearch(e.target.value)
					}}
				/>
			</Flex>
			{filteredWorkups?.map((workup, index) => (
				<div key={index}>
					<ItemBox
						data={workup}
						onEdit={() => {
							onOpenDrawer()
							setHeader("Edit Workup")
							setComponent(<UpdateWorkupFormWrapper workup={workup} />)
						}}
						onDelete={() => {
							onOpenDrawer()
							setHeader("Delete Workup")
							setComponent(<DeleteWorkupDialogueWrapper workup={workup} />)
						}}
					/>
					{/* <div> {JSON.stringify(template)})</div> */}
				</div>
			))}
		</Box>
	)
}

const UpdateWorkupFormWrapper = ({ workup }) => {
	const { onCloseDrawer } = useDrawer()

	const onSubmit = async (data) => {
		await workup.atomicUpdate(() => {
			return data
		})
		onCloseDrawer()
	}

	return (
		<WorkupForm
			defaultValues={workup.toJSON()}
			onSubmit={onSubmit}
			onCancel={onCloseDrawer}
			options={{ withTime: false }}
		/>
	)
}

const DeleteWorkupDialogueWrapper = ({ workup }) => {
	const { onCloseDrawer } = useDrawer()
	const queryClient = useQueryClient()

	const deleteLocalWorkupMutation = useMutation((workup) => workup.remove(), {
		onSuccess: () => {
			onCloseDrawer()
			queryClient.invalidateQueries("localWorkups")
		},
	})

	return workup ? (
		<DeleteDialogue
			itemName={"Workup: " + workup.name}
			onDelete={() => deleteLocalWorkupMutation.mutate(workup)}
			onCancel={onCloseDrawer}
		/>
	) : null
}

const fetchLocalWorkups = async () => {
	const DB = await getDB()
	const workupsQuery = DB.workups.find()
	const workups = await workupsQuery.exec()
	return workups
}

const ItemBox = ({ data, onEdit, onDelete }) => (
	<SwipeEditAndLongPressBox onEdit={onEdit} onDelete={onDelete} borderRadius="0.5" mx="1" my="1">
		<Box bg="white" py="1" borderRadius="0.5" pl="1">
			{data.name}
		</Box>
	</SwipeEditAndLongPressBox>
)
