import { configureStore } from '@reduxjs/toolkit'
import errorsReducer from './reducers/error'
import companyReducer from './reducers/company'
import employeeReducer from './reducers/employee'

const store = configureStore({
	reducer: {
		errors: errorsReducer,
		companies: companyReducer,
		employees: employeeReducer,
	},
})

export default store

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
