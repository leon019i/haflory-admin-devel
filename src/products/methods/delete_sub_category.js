import { mutation } from '@/core/methods/mutation';

const deleteSubCategory = (_variables) => {
	let responseFromApi;

	let variables = {
		id: _variables
	};


	let mutaionPath = 'products/api/mutations/delete_sub_category';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'subCategories',
		mutaion_name: 'deleteSubCategory',
		path: 'products/api/queries/sub_categories_query' //to update query path
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

export { deleteSubCategory };
