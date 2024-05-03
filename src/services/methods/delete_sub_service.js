import { mutation } from '@/core/methods/mutation';

const deleteSubService = (_variables) => {
	let responseFromApi;

	let variables = {
		id: _variables
	};


	let mutaionPath = 'services/api/mutations/delete_sub_service';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'services',
		mutaion_name: 'deleteSubService',
		path: 'services/api/queries/services_query' //to update query path
	};

	let isVariable = false;

	let methodName = 'delete';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { deleteSubService };
