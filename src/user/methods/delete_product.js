import { mutation } from '@/core/methods/mutation';

const deleteProduct = (_variables) => {
	let responseFromApi;

	let variables = {
		id: _variables._id
	};

	let mutaionPath = 'products/api/mutations/delete_product';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'pendingApprovalList',
		mutaion_name: 'deleteProduct',
		path: 'user/api/queries/pending_approval_list_query' //to update query path
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

export { deleteProduct };
