import React from 'react'
import styled from 'styled-components'

const LoaderBlock = styled.div`
	width: 100%;
	padding-top: 30vh;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (max-width: 768px) {
		padding-top: 15vh;
	}
`

const Block = styled.div`
	perspective: 120px;
`


const Loader = () => {
	return (
		<LoaderBlock>
			<Block>
				<p>Loading...</p>
			</Block>
		</LoaderBlock>
	)
}

export default Loader
