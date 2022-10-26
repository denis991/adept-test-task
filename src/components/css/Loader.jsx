import React from 'react'
import styled from 'styled-components'

const LoaderBlock = styled.div`
	width: 100%;
	padding-top: 31vh;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (max-width: 768px) {
		padding-top: 15vh;
	}
`



const Loader = () => {
	return (
		<LoaderBlock>
				<p>Loading...</p>
		</LoaderBlock>
	)
}

export default Loader
