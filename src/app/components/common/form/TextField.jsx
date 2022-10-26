import React from 'react'
import styled from 'styled-components'



const FieldBlock = styled.div`
	width: 100%;
	height: 85px;
	position: relative;
	margin-bottom: 10px;
`
const FieldInput = styled.input`
	width: 100%;
	font-size: 18px;
	padding: 10px;
	border: 1px solid #1a1717;
	background: none;
	color: #1a1717;
	:focus-visible {
		outline: none;
	}
`
const FieldLabel = styled.label`
	font-size: 18px;
`
const FieldError = styled.p`
	font-size: 14px;
	color: #7dc996;
`

const TextField = ({
	label,
	name,
	value,
	onChange,
	error,
	...rest
}) => {
	const handleChange = (e) => {
		onChange({ [e.target.name]: e.target.value })
	}

	return (
		<FieldBlock>
			<FieldLabel
				htmlFor={name}
				style={{
					color: error ? '#7dc996' : '#1a1717',
				}}>
				{label}
			</FieldLabel>
			<FieldInput
				type='text'
				id={name}
				name={name}
				onChange={(e) => handleChange(e)}
				autoComplete={name}
				value={value || ''}
				{...rest}
				style={{
					borderColor: error ? '#7dc996' : '#1a1717',
					color: error ? '#7dc996' : '#1a1717',
				}}
			/>

			{error && <FieldError>{error}</FieldError>}
		</FieldBlock>
	)
}

export default TextField
