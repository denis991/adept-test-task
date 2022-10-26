import httpService from './http.service'

const endpoint = 'employee'

const employeeService = {
	getList: async (company , cursor ) => {
		const { data } = await httpService.get(endpoint + '/' + company)
		return data
	},
	getExtraList: async (company , cursor ) => {
		const { data } = await httpService.get(
			endpoint + '/' + company + '?cursor=' + cursor,
		)
		return data
	},
	add: async (payload) => {
		const { data } = await httpService.post(endpoint, payload)
		return data
	},
	delete: async (id ) => {
		const { data } = await httpService.delete(endpoint + '/' + id)
		return data
	},
}

export default employeeService
