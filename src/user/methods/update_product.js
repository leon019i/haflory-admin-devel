import { mutation } from '@/core/methods/mutation';

const updateProduct = (_variables) => {
	let responseFromApi;

	let variables = {
		id: _variables.id,
		name: _variables.name,
		active: _variables.active,
		description: _variables.description,
		createdBy: _variables.createdBy,
		category: _variables.category,
		material: _variables.material,
		dimension: _variables.dimension,
		avatar: _variables.avatar,
		quantity: parseInt(_variables.quantity),
		sku: _variables.sku,
		price: parseFloat(_variables.price),
		featured: _variables.featured
	};

	let mutaionPath = 'products/api/mutations/update_product';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'pendingApprovalList',
		mutaion_name: 'updateProduct',
		path: 'user/api/queries/pending_approval_list_query' //to update query path
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

export { updateProduct };
