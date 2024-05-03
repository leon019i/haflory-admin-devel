import { mutation } from '@/core/methods/mutation';

const deleteService = (_variables) => {
	let responseFromApi;

	let variables = {
		id: _variables
	};

	// console.log(_variables)

	let mutaionPath = 'services/api/mutations/delete_service';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'services',
		mutaion_name: 'deleteService',
		path: 'services/api/queries/services_query' //to update query path
	};

	let isVariable = false;

	let methodName = 'delete';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log("delete", data);

			return data;
		})
		.catch((error) => {
			console.log("error", error);
			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { deleteService };
