import { mutation } from '@/core/methods/mutation';

const deleteDriver = (_variables, limitSkip) => {
	let responseFromApi;

	let variables = {
		id: _variables._id
	};

	let mutaionPath = 'user/api/mutations/delete_seller';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'drivers',
		mutaion_name: 'deleteDriver',
		path: 'user/api/queries/sellers_query' //to update query path
	};

	let isVariable = true;

	let methodName = 'delete';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName, limitSkip)
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { deleteDriver };
