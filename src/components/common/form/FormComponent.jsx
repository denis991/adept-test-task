import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import AppButton from '../../css/AppButton'

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 60%;
	margin: 15px auto;
	@media (max-width: 992px) {
		width: 80%;
	}
	@media (max-width: 580px) {
		width: 95%;
	}
`

const FormComponent = ({
	initialData,
	onSubmit,
	btnLabel,
	children,

}) => {
	const [data, setData] = useState({})
	const [error, ] = useState({})



	useEffect(() => {
		if (initialData) {
			setData(initialData)
		}

		return () => setData({})
	}, [initialData])


	const changeHandler = (value) => {
		setData((prevState) => ({
			...prevState,
			...value,
		}))
	}

	const submitHandler = (e) => {
		e.preventDefault()
		if (!Object.keys(error).length && Object.keys(data).length) {
			onSubmit(data)
		}
	}

	return (
		<Form onSubmit={submitHandler}>
			{React.Children.map(children, (child) => {
				const config = {
					...child.props,
					onChange: changeHandler,
					value: data[child.props.name],
					error: error[child?.props?.name],
				}

				return React.cloneElement(child, config)
			})}

			<AppButton type='submit'>{btnLabel}</AppButton>
		</Form>
	)
}

export default FormComponent
