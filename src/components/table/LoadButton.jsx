import React from 'react'
import styled from 'styled-components'
import AppButton from '../css/AppButton'



const TableButton = styled.div`
	bottom: 5px;
	left: 5px;
	z-index: 3;
`

const LoadButton = ({ onClick} ) => {
	return (
		<TableButton>
			<AppButton onClick={onClick}>Загрузить еще</AppButton>
		</TableButton>
	)
}

export default LoadButton
