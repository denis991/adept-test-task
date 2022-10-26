import React, { useState } from 'react'
import FormComponent from '../components/common/form/FormComponent'
import TextField from '../components/common/form/TextField'

import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AppModal from '../components/common/AppModal'
import { addEmployee, getEmployeesCurrentCompany } from '../redux/reducers/employee'

const PageTitle = styled.h2`
	text-align: center;
`

const AddEmployee = () => {
	const [showSearchModal, setSearchShowModal] = useState(false)
	const dispatch = useDispatch()
	const currentCompany = useSelector(getEmployeesCurrentCompany())
	const navigate = useNavigate()

	const onSubmit = (data) => {
		const reqData = {
			firstName: data.firstName,
			lastName: data.lastName,
			position: data.position,
			company: currentCompany,
		}

		dispatch(addEmployee(reqData))
		navigate('/')
	}

	return (
		<>
			<PageTitle>Новый сотрудник</PageTitle>
			<FormComponent
				onSubmit={onSubmit}
				btnLabel='Добавить'>
				<TextField
					name='firstName'
					label='Имя'
					value={''}
					onChange={() => {}}
					error={null}
				/>
				<TextField
					name='lastName'
					label='Фамилия'
					value={''}
					onChange={() => {}}
					error={null}
				/>
				<TextField
					name='position'
					label='Должность'
					value={''}
					onChange={() => {}}
					error={null}
				/>
			</FormComponent>
			<AppModal show={showSearchModal} setShow={setSearchShowModal} />
		</>
	)
}

export default AddEmployee
