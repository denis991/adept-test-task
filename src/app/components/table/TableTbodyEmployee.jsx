import React from 'react'

import TableTrEmployeeItem from './TableTrEmployeeItem'



const TableTbodyEmployee = ({
	items,
	current,
	checkedAll,
	changeCurrent,
}) => {
	return (
		<tbody>
			{items.map((item) => (
				<TableTrEmployeeItem
					key={item._id}
					item={item}
					current={current}
					changeCurrent={changeCurrent}
					checkedAll={checkedAll}
				/>
			))}
		</tbody>
	)
}

export default TableTbodyEmployee
