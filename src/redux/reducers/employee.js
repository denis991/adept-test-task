
import { setLoadingError } from './error'
import { createSlice,  } from '@reduxjs/toolkit'

import employeeService from '../actions/employee'
import { changeCompany } from './company'



const initialState = {
	entities: [],
	currentCompany: '',
	hasNextPage: false,
	cursor: '',
	isLoading: false,
}

const employeeSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		employeesLoaded(
			state,
			action,
		) {
			state.entities = action.payload.employees
			state.hasNextPage = action.payload.hasNextPage
			state.cursor = action.payload.cursor
		},
		employeesListCleared(state) {
			state.entities = []
			state.currentCompany = ''
			state.cursor = ''
			state.hasNextPage = false
		},
		employeeExtraLoaded(
			state,
			action,
		) {
			state.entities = [...state.entities, ...action.payload.employees]
			state.hasNextPage = action.payload.hasNextPage
			state.cursor = action.payload.cursor
		},
		employeeLoadingStart(state) {
			state.isLoading = true
		},
		employeeAdded(state, action) {
			state.entities = [action.payload, ...state.entities]
		},
		employeeDeleted(state, action) {
			state.entities = state.entities.filter(
				(item) => item._id !== action.payload,
			)
		},
		employeeCurrentCompanyChanged(state, action) {
			state.currentCompany = action.payload
		},
		employeeLoadingEnd(state) {
			state.isLoading = false
		},
	},
})

const {
	employeesLoaded,
	employeeExtraLoaded,
	employeeLoadingStart,
	employeeDeleted,
	employeeLoadingEnd,
	employeesListCleared,
	employeeAdded,
	employeeCurrentCompanyChanged,
} = employeeSlice.actions

export const loadEmployeesList =
	(company ) => async (dispatch) => {
		dispatch(employeeLoadingStart())
		try {
			const payload = await employeeService.getList(company)
			dispatch(employeesLoaded(payload))
		} catch (error) {
			dispatch(setLoadingError(error))
		} finally {
			dispatch(employeeLoadingEnd())
		}
	}

export const loadEmployeesExtraList =
	(company , cursor ) => async (dispatch) => {
		dispatch(employeeLoadingStart())
		try {
			const payload = await employeeService.getExtraList(company, cursor)
			dispatch(employeeExtraLoaded(payload))
		} catch (error) {
			dispatch(setLoadingError(error))
		} finally {
			dispatch(employeeLoadingEnd())
		}
	}

export const addEmployee =
	(data) =>
	async (dispatch) => {
		dispatch(employeeLoadingStart())
		try {
			const payload = await employeeService.add(data)
			dispatch(employeeAdded(payload))
			dispatch(changeCompany({ _id: payload.company, inc: 1 }))
		} catch (error) {
			dispatch(setLoadingError(error))
		} finally {
			dispatch(employeeLoadingEnd())
		}
	}

export const deleteEmployee =
	(data ) => async (dispatch) => {
		dispatch(employeeLoadingStart())
		try {
			const payload = await employeeService.delete(data)
			dispatch(employeeDeleted(payload._id))
			dispatch(changeCompany({ _id: payload.company, inc: -1 }))
		} catch (error) {
			dispatch(setLoadingError(error))
		} finally {
			dispatch(employeeLoadingEnd())
		}
	}

export const clearEmployeesList = () => async (dispatch) => {
	dispatch(employeesListCleared())
}

export const setEmployeesCurrentCompany =
	(company ) => async (dispatch) => {
		dispatch(employeeCurrentCompanyChanged(company))
	}

export const getEmployeesList = () => (state) => {
	return state.employees.entities
}

export const getEmployeesHasNextPage = () => (state) => {
	return state.employees.hasNextPage
}

export const getEmployeesCurrentCompany = () => (state) => {
	return state.employees.currentCompany
}

export const getEmployeesCursor = () => (state) => {
	return state.employees.cursor
}

export const getEmployeesLoadingStatus = () => (state) => {
	return state.employees.isLoading
}

export default employeeSlice.reducer
