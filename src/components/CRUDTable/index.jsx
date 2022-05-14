import { useEffect, useRef, useState } from "react"
import { useGlobalFilter, usePagination, useTable } from "react-table"

import { getDB } from "../../db"
import { v4 as uuid } from "uuid"
import {
	Input,
	Select,
	Table as ChakraTable,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Box,
	Flex,
	Button,
} from "@chakra-ui/react"
import { Add, CaretLeft, CaretRight, Search, TrashCan } from "@carbon/icons-react"

function CRUDTable({ schema }) {
	const [data, setData] = useState([])
	const dbref = useRef()

	useEffect(() => {
		const fetchData = async () => {
			dbref.current = await getDB()
			const dataQuery = dbref.current[schema.title].find()
			const dataInit = await dataQuery.exec()
			setData(dataInit)
			const sub = dataQuery.$.subscribe((data) => {
				if (!data) {
					return
				}
				setData(data)
			})
			return () => sub.unsubscribe()
		}
		fetchData()
	}, [schema.title])

	const addData = async (data) => {
		data = { ...data, _id: uuid(), updated_at: new Date().toISOString() }
		dbref.current[schema.title].insert(data)
	}

	return (
		<div>
			<Table
				columns={[
					...Object.keys(schema.properties)
						.filter((property) => property !== "_id" && property !== "updated_at")
						.map((property) => {
							var columnObj = {
								Header: property,
								accessor: property,
								type: schema.properties[property].type,
							}
							return columnObj
						}),
				]}
				data={data}
				addItem={async () => {
					await addData({})
				}}
			/>
		</div>
	)
}

const EditableCell = ({ value: initialValue = "", row: { index }, column, data }) => {
	// We need to keep and update the state of the cell normally
	const [value, setValue] = useState(initialValue)
	const { id, type } = column
	const onChange = (e) => {
		setValue(e.target.value)
	}

	// We'll only update the external data when the input is blurred
	const onBlur = async () => {
		if (type === "string") {
			await data[index].update({
				$set: {
					[id]: value,
					updated_at: new Date().toISOString(),
				},
			})
		} else if (type === "object") {
			await data[index].update({
				$set: {
					[id]: JSON.parse(value),
					updated_at: new Date().toISOString(),
				},
			})
		}
	}

	// If the initialValue is changed external, sync it up with our state
	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	return <Input variant="unstyled" value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
	Cell: EditableCell,
}

export function Table({ columns, data, skipPageReset, addItem, plugins = [], variant = "carbon" }) {
	// For this example, we're using pagination to illustrate how to stop
	// the current page from resetting when our data changes
	// Otherwise, nothing is different here.
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		setGlobalFilter,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
			// use the skipPageReset option to disable page resetting temporarily
			autoResetPage: !skipPageReset,
		},
		useGlobalFilter,
		...plugins,
		usePagination
	)
	const [searchExpanded, setSearchExpanded] = useState(false)
	return (
		<>
			<Flex h="6" alignItems="center" direction="row-reverse">
				<Button onClick={addItem} variant="primary" p="1" borderRadius="none">
					<Add size={32} />
				</Button>
				<Flex
					as="button"
					flex={searchExpanded ? "1" : ""}
					onFocus={() => {
						if (!searchExpanded) {
							setSearchExpanded(true)
						}
					}}
					bg="transparent"
					alignItems="center"
					border="none"
				>
					<Box>
						<Search size={20} />
					</Box>
					<Input
						variant="carbon"
						display={searchExpanded ? "" : "none"}
						onChange={(e) => {
							setGlobalFilter(e.target.value)
						}}
						onBlur={() => {
							setSearchExpanded(false)
						}}
					/>
				</Flex>
			</Flex>

			<ChakraTable variant={variant} {...getTableProps()}>
				<Thead bg="ui03">
					{headerGroups.map((headerGroup) => (
						<Tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
							))}
							<Th></Th>
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row)
						return (
							<Tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
								})}
								<Td>
									<Button
										onClick={async () => {
											await data[row.index].remove()
										}}
										border="none"
									>
										<TrashCan size={24} />
									</Button>
								</Td>
							</Tr>
						)
					})}
				</Tbody>
			</ChakraTable>
			<Flex h="6" bg="ui01">
				<Flex alignItems="center" flex="1">
					Items per page:&nbsp;
					<Select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value))
						}}
						w="12"
						h="5"
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{pageSize}
							</option>
						))}
					</Select>
				</Flex>
				<Flex alignItems="center">
					<Input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0
							gotoPage(page)
						}}
						variant="carbon"
						p="0"
						w="6"
					/>
					&nbsp; of {pageOptions.length} pages
				</Flex>
				<Box
					as="button"
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
					border="none"
				>
					<CaretLeft size={32} />
				</Box>
				<Box as="button" onClick={() => nextPage()} disabled={!canNextPage} border="none">
					<CaretRight size={32} />
				</Box>
			</Flex>
		</>
	)
}

export default CRUDTable
