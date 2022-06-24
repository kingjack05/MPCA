import { pageNameAtom } from "../../../atoms"
import ProblemUI from "../../../components/UI/ProblemUI"

import { useUpdateAtom } from "jotai/utils"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Box, Flex } from "@chakra-ui/react"
import { getDB } from "../../../db.ts"
import { SearchBar } from "../../../components/UI/SearchBar/SearchBar"
import { useDrawer } from "../../../components/Context Providers/DrawerContext"
import { DeleteDialogue } from "../../../components/UI/Dialogues/DeleteDialogue"
import { MedForm } from "../../../components/UI/Forms/MedForm"
import { LabForm } from "../../../components/UI/Forms/LabForm"
import { LogForm } from "../../../components/UI/Forms/LogForm"
import { ImageForm } from "../../../components/UI/Forms/ImageForm"
import { WorkupForm } from "../../../components/UI/Forms/WorkupForm"
import { InfoTypeRadioGroup } from "../../PatientMainPage/ProblemsList/drawers"

export const TemplatesManager = () => {
	const setPageName = useUpdateAtom(pageNameAtom)
	useEffect(() => {
		setPageName("Manage Database")
	}, [setPageName])

	const { onOpenDrawer, setHeader, setComponent } = useDrawer()

	const { data, status } = useQuery("localTemplates", fetchLocalTemplates)

	const [search, setSearch] = useState("")
	const filteredTemplates =
		status === "success"
			? data.filter(({ problem }) => {
					const fuzzySearchRegex = new RegExp(`\\b${search}`, "i")
					return fuzzySearchRegex.test(problem)
			  })
			: []

	return (
		<Box>
			<Box fontSize="20px" mt="2" mb="1" pl="2">
				Templates
			</Box>
			<Flex direction="row-reverse" h="5" mb="1">
				<SearchBar
					onChange={(e) => {
						setSearch(e.target.value)
					}}
				/>
			</Flex>
			{filteredTemplates?.map((template, index) => (
				<Box key={index} mx="1">
					<ProblemUI
						data={template}
						onDeleteProblem={() => {
							onOpenDrawer()
							setHeader("Delete Template")
							setComponent(<DeleteTemplateDialogueWrapper template={template} />)
						}}
						onCreateInfo={() => {
							onOpenDrawer()
							setHeader("Add Info")
							setComponent(<CreateInfoItemFormWrapper template={template} />)
						}}
						onUpdateInfo={(infoIndex, category) => {
							onOpenDrawer()
							setHeader("Edit " + singularizeCategoryName(category))
							setComponent(
								<UpdateInfoItemFormWrapper
									template={template}
									infoIndex={infoIndex}
									category={category}
								/>
							)
						}}
						onDeleteInfo={(infoIndex, category) => {
							onOpenDrawer()
							setHeader("Delete " + singularizeCategoryName(category))
							setComponent(
								<DeleteInfoItemDialogueWrapper
									template={template}
									infoIndex={infoIndex}
									category={category}
								/>
							)
						}}
					/>
					{/* <div> {JSON.stringify(template)})</div> */}
				</Box>
			))}
		</Box>
	)
}

const DeleteTemplateDialogueWrapper = ({ template }) => {
	const { onCloseDrawer } = useDrawer()

	const queryClient = useQueryClient()

	const deleteLocalTemplateMutation = useMutation((workup) => workup.remove(), {
		onSuccess: () => {
			onCloseDrawer()
			queryClient.invalidateQueries("localTemplates")
		},
	})

	return template ? (
		<DeleteDialogue
			itemName={"Template: " + template.problem}
			onDelete={() => deleteLocalTemplateMutation(template)}
			onCancel={onCloseDrawer}
		/>
	) : null
}

const CreateInfoItemFormWrapper = ({ template }) => {
	const { setHeader, onCloseDrawer } = useDrawer()
	const [category, setCategory] = useState()

	const formProps = {
		onSubmit: async (data) => {
			const dataWithoutTime = data
			delete dataWithoutTime.time
			await template.atomicUpdate((oldData) => {
				const info = { category, content: dataWithoutTime }
				oldData.info.push(info)
				return oldData
			})
			onCloseDrawer()
		},
		onClose: onCloseDrawer,
		options: { withTime: false },
	}

	const mapCategoryToForm = {
		Meds: <MedForm {...formProps} />,
		Labs: <LabForm {...formProps} />,
		Logs: <LogForm {...formProps} />,
		Images: <ImageForm {...formProps} />,
		Workups: <WorkupForm {...formProps} />,
	}
	return (
		<>
			<InfoTypeRadioGroup
				value={category}
				onChange={(newValue) => {
					setHeader("Add " + singularizeCategoryName(newValue))
					setCategory(newValue)
				}}
			/>
			{mapCategoryToForm[category]}
		</>
	)
}

const UpdateInfoItemFormWrapper = ({ template, infoIndex, category }) => {
	const { onCloseDrawer } = useDrawer()

	const formProps = {
		defaultValues: template.info[infoIndex].content,
		onSubmit: async (data) => {
			await template.atomicUpdate((oldData) => {
				const info = { category, content: data }
				oldData.info[infoIndex] = info
				return oldData
			})
			onCloseDrawer()
		},
		onClose: onCloseDrawer,
		options: { withTime: false },
	}

	const mapCategoryToForm = {
		Meds: <MedForm {...formProps} />,
		Labs: <LabForm {...formProps} />,
		Logs: <LogForm {...formProps} />,
		Images: <ImageForm {...formProps} />,
		Workups: <WorkupForm {...formProps} />,
	}

	return mapCategoryToForm[category]
}

const DeleteInfoItemDialogueWrapper = ({ template, infoIndex, category }) => {
	const { onCloseDrawer } = useDrawer()
	const queryClient = useQueryClient()

	const deleteInfoItemMutation = useMutation(
		async (template) =>
			await template.atomicUpdate((oldData) => {
				oldData.info.splice(infoIndex, 1)
				return oldData
			}),
		{
			onSuccess: () => {
				onCloseDrawer()
				queryClient.invalidateQueries("localTemplates")
			},
		}
	)

	return template.info[infoIndex] ? (
		<DeleteDialogue
			itemName={
				singularizeCategoryName(category) + ": " + template.info[infoIndex].content.name
			}
			onDelete={() => {
				deleteInfoItemMutation.mutate(template)
			}}
			onCancel={onCloseDrawer}
		/>
	) : null
}

const fetchLocalTemplates = async () => {
	const DB = await getDB()
	const templatesQuery = DB.templates.find()
	const templates = await templatesQuery.exec()
	return templates
}

const singularizeCategoryName = (categoryName) => {
	if (categoryName === "Images") {
		return "Image"
	} else {
		return categoryName.slice(0, -1)
	}
}
