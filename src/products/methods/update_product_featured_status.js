import { mutation } from '@/core/methods/mutation';

const updateProductFeatured = (_id, _status) => {
	let responseFromApi;

	let variables = {
		id: _id,
		featured: _status
	};

	let mutaionPath = 'products/api/mutations/update_product_featured_status';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'products',
		mutaion_name: 'updateProductFeatured',
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

export { updateProductFeatured };
