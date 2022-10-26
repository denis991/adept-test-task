import styled from 'styled-components'

const AppButton = styled.button`
	padding: 5px 10px;
	background-color: #04b51b;
	color: #1a1717;
	border: none;
	border-radius: 3px;
	font-size: 18px;
	cursor: pointer;

	:hover {
		background-color: #7dc996;
	}

	:disabled {
		background-color: rgb(120, 120, 120);
		cursor: auto;
	}
`

export default AppButton
