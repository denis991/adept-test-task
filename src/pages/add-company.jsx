import React from 'react'
import styled from 'styled-components'
import FormComponent from '../components/common/form/FormComponent'
import TextField from '../components/common/form/TextField'
import { useDispatch } from 'react-redux'
import { addCompany } from '../redux/reducers/company'
import { useNavigate } from 'react-router-dom'

const PageTitle = styled.h2`
	text-align: center;
`

const AddCompany = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSubmit = (data) => {
		const reqData = {
			name: data.name,
			address: data.address,
		}

		dispatch(addCompany(reqData))
		navigate('/')
	}

	return (
		<>
			<PageTitle>Новая компания</PageTitle>
			<FormComponent
				onSubmit={onSubmit}
				btnLabel='Добавить'>
				<TextField
					name='name'
					label='Наименование'
					value={''}
					onChange={() => {}}
					error={null}
				/>
				<TextField
					name='address'
					label='Адрес'
					value={''}
					onChange={() => {}}
					error={null}
				/>
			</FormComponent>
		</>
	)
}

export default AddCompany
