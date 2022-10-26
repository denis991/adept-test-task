import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	deleteCompany,
	getCompaniesCursor,
	getCompaniesHasNextPage,
	getCompaniesList,
	getCompaniesLoadingStatus,
	loadCompaniesExtraList,
} from '../../redux/reducers/company'
import {
	clearEmployeesList,
	getEmployeesCurrentCompany,
	loadEmployeesList,
	setEmployeesCurrentCompany,
} from '../../redux/reducers/employee'
import AppTable from '../css/AppTable'
import Loader from '../css/Loader'
import TableContainer from '../css/TableContainer'
import LoadButton from '../table/LoadButton'
import TableTitle from '../table/TableTitle'
import TableThead from '../table/TableThead'
import TableTbodyCompany from '../table/TableTbodyCompany'

const CompaniesTable = () => {
	const [current, setCurrent] = useState('')
	const currentCompany = useSelector(getEmployeesCurrentCompany())
	const [checkedAll, setChecked] = useState(false)
	const dispatch = useDispatch()
	const companies = useSelector(getCompaniesList())
	const companyLoading = useSelector(getCompaniesLoadingStatus())
	const hasNextPage = useSelector(getCompaniesHasNextPage())
	const cursorCompanies = useSelector(getCompaniesCursor())

	useEffect(() => {
		setCurrent(currentCompany)
	}, [currentCompany])

	const changeCurrentCompany = (id) => {
		if (current === id) {
			setCurrent('')
			dispatch(clearEmployeesList())
		} else {
			setCurrent(id)
			dispatch(setEmployeesCurrentCompany(id))
			dispatch(loadEmployeesList(id))
		}
	}

	const handleDeleteCompany = () => {
		dispatch(deleteCompany(current))
		setCurrent('')
	}

	const loadExtraListCompanies = () => {
		dispatch(loadCompaniesExtraList(cursorCompanies))
	}

	return (
		<TableContainer>
			{companyLoading ? (
				<Loader />
			) : (
				<>
					<div>
						<TableTitle
							title='Компании'
							addPath='/add-company'
							deleteBtnDisabled={!Boolean(current)}
							deleteBtnonClick={handleDeleteCompany}
							showAddButton={true}
						/>

						<AppTable>
							<TableThead
								checkboxOnChange={setChecked}
								checkboxChecked={checkedAll}
								names={[
									'Название',
									'Количество сотрудников',
									'Адрес',
								]}
							/>
							<TableTbodyCompany
								items={companies}
								current={current}
								changeCurrent={changeCurrentCompany}
								checkedAll={checkedAll}
							/>
						</AppTable>
					</div>
					{hasNextPage && (
						<LoadButton onClick={loadExtraListCompanies} />
					)}
				</>
			)}
		</TableContainer>
	)
}

export default CompaniesTable
