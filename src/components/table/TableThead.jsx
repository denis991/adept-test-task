import React from 'react'



const TableThead = ({ checkboxOnChange, checkboxChecked, names }) => {
	const changeChecked = () => {
		if (checkboxChecked) {
			checkboxOnChange(false)
		} else {
			checkboxOnChange(true)
		}
	}

	return (
		<thead>
			<tr>
				<th scope='col'>
					<input
						type='checkbox'
						onChange={changeChecked}
						checked={checkboxChecked}
					/>
				</th>
				{names.map((name) => (
					<th key={name} align='left' scope='col'>
						{name}
					</th>
				))}
			</tr>
		</thead>
	)
}

export default TableThead
