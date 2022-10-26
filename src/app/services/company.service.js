import httpService from './http.service'

const endpoint = 'company'

const companyService = {
	getList: async () => {
		const { data } = await httpService.get(endpoint)
		return data
	},
	getExtraList: async (cursor) => {
		const { data } = await httpService.get(endpoint + '?cursor=' + cursor)
		return data
	},
	add: async (payload) => {
		const { data } = await httpService.post(endpoint, payload)
		return data
	},
	delete: async (id) => {
		const { data } = await httpService.delete(endpoint + '/' + id)
		return data
	},
}

export default companyService
