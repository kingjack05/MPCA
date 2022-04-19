import { useEffect, useRef, useState } from "react"
import { usePagination, useTable } from "react-table"

import { getDB } from "../../db"
import { v4 as uuid } from "uuid"

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
		data = { ...data, _id: uuid() }
		dbref.current[schema.title].insert(data)
	}

	return (
		<div>
			<Table
				columns={Object.keys(schema.properties)
					.filter((property) => property !== "_id")
					.map((property) => {
						var columnObj = { Header: property, accessor: property }
						return columnObj
					})}
				data={data}
			/>
			<button
				onClick={async () => {
					await addData({})
				}}
			>
				Add Item
			</button>
		</div>
	)
}

const EditableCell = ({ value: initialValue = "", row: { index }, column: { id }, data }) => {
	// We need to keep and update the state of the cell normally
	const [value, setValue] = useState(initialValue)

	const onChange = (e) => {
		setValue(e.target.value)
	}

	// We'll only update the external data when the input is blurred
	const onBlur = async () => {
		await data[index].update({
			$set: {
				[id]: value,
			},
		})
	}

	// If the initialValue is changed external, sync it up with our state
	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
	Cell: EditableCell,
}

function Table({ columns, data, skipPageReset }) {
	// For this example, we're using pagination to illustrate how to stop
	// the current page from resetting when our data changes
	// Otherwise, nothing is different here.
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
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
		usePagination
	)

	return (
		<>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render("Header")}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
								})}
								<td>
									<button
										onClick={async () => {
											await data[row.index].remove()
										}}
									>
										delete
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<div className="pagination">
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{"<<"}
				</button>{" "}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					{"<"}
				</button>{" "}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{">"}
				</button>{" "}
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{">>"}
				</button>{" "}
				<span>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{" "}
				</span>
				<span>
					| Go to page:{" "}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0
							gotoPage(page)
						}}
						style={{ width: "100px" }}
					/>
				</span>{" "}
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value))
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</>
	)
}

export default CRUDTable
