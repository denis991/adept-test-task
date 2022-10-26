import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
	clearEmployeesList,
	deleteEmployee,
	getEmployeesCurrentCompany,
	getEmployeesCursor,
	getEmployeesHasNextPage,
	getEmployeesList,
	getEmployeesLoadingStatus,
	loadEmployeesExtraList,
	loadEmployeesList,
} from '../../redux/reducers/employee'
import Loader from '../css/Loader'
import TableContainer from '../css/TableContainer'
import LoadButton from '../table/LoadButton'
import TableTitle from '../table/TableTitle'
import AppTable from '../css/AppTable'
import TableThead from '../table/TableThead'
import TableTbodyEmployee from '../table/TableTbodyEmployee'

const EmployeesTable = () => {
	const [currentEmployee, setCurrentEmployee] = useState('')
	const [checkedAll, setChecked] = useState(false)
	const dispatch = useDispatch()
	const currentCompany = useSelector(getEmployeesCurrentCompany())
	const employeesCursor = useSelector(getEmployeesCursor())
	const employees = useSelector(getEmployeesList())
	const isLoading = useSelector(getEmployeesLoadingStatus())
	const hasNextPage = useSelector(getEmployeesHasNextPage())

	useEffect(() => {
		if (currentCompany) {
			dispatch(loadEmployeesList(currentCompany))
		} else {
			dispatch(clearEmployeesList())
		}

		return () => setCurrentEmployee('')
	}, [currentCompany, dispatch])

	const changeCurrentEmployee = (id) => {
		if (currentEmployee === id) {
			setCurrentEmployee('')
		} else {
			setCurrentEmployee(id)
		}
	}

	const handleDeleteEmployee = () => {
		dispatch(deleteEmployee(currentEmployee))
		setCurrentEmployee('')
	}

	const handleLoadExtraListEmployees = () => {
		dispatch(loadEmployeesExtraList(currentCompany, employeesCursor))
	}

	return (
		<TableContainer>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div>
						<TableTitle
							title='Сотрудники'
							addPath='/add-employee'
							deleteBtnDisabled={!Boolean(currentEmployee)}
							deleteBtnonClick={handleDeleteEmployee}
							showAddButton={Boolean(currentCompany)}
						/>

						<AppTable>
							<TableThead
								checkboxOnChange={setChecked}
								checkboxChecked={checkedAll}
								names={['Имя', 'Фамилия', 'Должность']}
							/>
							<TableTbodyEmployee
								items={employees}
								current={currentEmployee}
								changeCurrent={changeCurrentEmployee}
								checkedAll={checkedAll}
							/>
						</AppTable>
					</div>
					{hasNextPage && (
						<LoadButton onClick={handleLoadExtraListEmployees} />
					)}
				</>
			)}
		</TableContainer>
	)
}

export default EmployeesTable
