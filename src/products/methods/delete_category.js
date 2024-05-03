import { mutation } from '@/core/methods/mutation';

const deleteCategory = (_variables) => {
	let responseFromApi;

	let variables = {
		id: _variables._id
	};

	let mutaionPath = 'products/api/mutations/delete_category';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'categories',
		mutaion_name: 'deleteCategory',
		path: 'products/api/queries/categories_query' //to update query path
	};

	let isVariable = true;

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

export { deleteCategory };
