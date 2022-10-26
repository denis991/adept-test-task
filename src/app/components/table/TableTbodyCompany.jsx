import React from 'react'
import TableTrCompanyItem from './TableTrCompany'

const TableTbodyCompany = ({
	items,
	current,
	checkedAll,
	changeCurrent,
}) => {
	return (
		<tbody>
			{items.map((item) => (
				<TableTrCompanyItem
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

export default TableTbodyCompany
