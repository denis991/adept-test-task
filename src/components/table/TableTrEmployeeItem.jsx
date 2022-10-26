import React from 'react'
import styled from 'styled-components'


const TableTr = styled.tr`
	cursor: pointer;

	:hover {
		color: #7dc996;
	}

	&.active {
		color: #04b51b;
	}
`



const TableTrEmployeeItem = ({
	item,
	current,
	checkedAll,
	changeCurrent,
}) => {
	return (
		<TableTr
			key={item._id}
			className={current === item._id ? 'active' : ''}
			onClick={() => changeCurrent(item._id)}>
			<th scope='row'>
				<input
					type='checkbox'
					onChange={() => changeCurrent(item._id)}
					checked={current === item._id || checkedAll}
				/>
			</th>
			<td>{item.firstName}</td>
			<td>{item.lastName}</td>
			<td>{item.position}</td>
		</TableTr>
	)
}

export default TableTrEmployeeItem
