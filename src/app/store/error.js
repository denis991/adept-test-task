import { createSlice } from '@reduxjs/toolkit'



const initialState = {
	error: null,
}

const errorSlice = createSlice({
	name: 'errors',
	initialState,
	reducers: {
		loadingError(state, action) {
			state.error = action.payload
		},
		errorCleared(state) {
			state.error = null
		},
	},
})

const { loadingError, errorCleared } = errorSlice.actions

export const setLoadingError =
	(error) => async (dispatch) => {
		if (error?.response?.data?.message) {
			dispatch(loadingError(error.response.data.message))
		}
	}

export const clearErrors = () => (dispatch) => {
	dispatch(errorCleared())
}

export const getError = () => (state) => {
	return state.errors.error
}

export default errorSlice.reducer
