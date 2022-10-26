
import { setLoadingError } from './error'
import { createSlice,  } from '@reduxjs/toolkit'
import companyService from '../services/company.service'



const initialState = {
	entities: [],
	search: [],
	hasNextPage: false,
	cursor: '',
	isLoading: true,
	dataLoaded: false,
}

const companySlice = createSlice({
	name: 'companies',
	initialState,
	reducers: {
		companiesLoaded(
			state,
			action,
		) {
			state.entities = action.payload.companies
			state.hasNextPage = action.payload.hasNextPage
			state.cursor = action.payload.cursor
			state.dataLoaded = true
		},
		companiesExtraLoaded(
			state,
			action,
		) {
			state.entities = [...state.entities, ...action.payload.companies]
			state.hasNextPage = action.payload.hasNextPage
			state.cursor = action.payload.cursor
		},
		companyLoadingStart(state) {
			state.isLoading = true
		},
		companyAdded(state, action) {
			state.entities = [action.payload, ...state.entities]
		},
		companyDeleted(state, action) {
			state.entities = state.entities.filter(
				(item) => item._id !== action.payload._id,
			)
		},
		companyChanged(
			state,
			action,
		) {
			state.entities = state.entities.map((item) => {
				if (item._id === action.payload._id) {
					return {
						...item,
						employeesCount:
							item.employeesCount + action.payload.inc,
					}
				}
				return item
			})
		},
		companyLoadingEnd(state) {
			state.isLoading = false
		},
	},
})

const {
	companiesLoaded,
	companiesExtraLoaded,
	companyLoadingStart,
	companyLoadingEnd,
	companyAdded,
	companyDeleted,
	companyChanged,
} = companySlice.actions

export const loadCompaniesList = () => async (dispatch) => {
	try {
		const payload = await companyService.getList()
		dispatch(companiesLoaded(payload))
	} catch (error) {
		dispatch(setLoadingError(error))
	} finally {
		dispatch(companyLoadingEnd())
	}
}

export const loadCompaniesExtraList =
	(cursor) => async (dispatch) => {
		dispatch(companyLoadingStart())
		try {
			const payload = await companyService.getExtraList(cursor)
			dispatch(companiesExtraLoaded(payload))
		} catch (error) {
			dispatch(setLoadingError(error))
		} finally {
			dispatch(companyLoadingEnd())
		}
	}

export const addCompany =
	(data) =>
	async (dispatch) => {
		dispatch(companyLoadingStart())
		try {
			const payload = await companyService.add(data)
			dispatch(companyAdded(payload))
		} catch (error) {
			dispatch(setLoadingError(error))
		} finally {
			dispatch(companyLoadingEnd())
		}
	}

export const deleteCompany =
	(data) => async (dispatch) => {
		dispatch(companyLoadingStart())
		try {
			const payload = await companyService.delete(data)
			dispatch(companyDeleted(payload))
		} catch (error) {
			dispatch(setLoadingError(error))
		} finally {
			dispatch(companyLoadingEnd())
		}
	}

export const changeCompany =
	(data) => async (dispatch) => {
		dispatch(companyChanged(data))
	}

export const getCompaniesList = () => (state ) => {
	return state.companies.entities
}

export const getSearchedCompaniesList = () => (state ) => {
	return state.companies.search
}

export const getCompaniesHasNextPage = () => (state ) => {
	return state.companies.hasNextPage
}

export const getCompaniesCursor = () => (state ) => {
	return state.companies.cursor
}

export const getCompaniesLoadingStatus = () => (state ) => {
	return state.companies.isLoading
}

export const getCompaniesDataLoadedStatus = () => (state ) => {
	return state.companies.dataLoaded
}

export default companySlice.reducer
