import { mutation } from '@/core/methods/mutation';

const updateProductStatus = (_id, _status) => {
	let responseFromApi;

	let variables = {
		id: _id,
		status: _status
	};

	let mutaionPath = 'products/api/mutations/update_product_active_status';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'products',
		mutaion_name: 'updateProductStatus',
		path: 'products/api/queries/product_query' //to update query path
	};

	let isVariable = true;

	let methodName = 'update';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { updateProductStatus };
