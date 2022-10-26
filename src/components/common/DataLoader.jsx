import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getCompaniesDataLoadedStatus,
	getCompaniesLoadingStatus,
	loadCompaniesList,
} from '../../redux/reducers/company'
import Loader from '../css/Loader'



const DataLoader = ({ children }) => {
	const dispatch = useDispatch()
	const dataLoaded = useSelector(getCompaniesDataLoadedStatus())
	const isCompanyLoading = useSelector(getCompaniesLoadingStatus())

	useEffect(() => {
		if (!dataLoaded) {
			dispatch(loadCompaniesList())
		}
	}, [dataLoaded, dispatch])

	return <>{isCompanyLoading && !dataLoaded ? <Loader /> : children}</>
}

export default DataLoader
