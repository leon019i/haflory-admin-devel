import { mutation } from '@/core/methods/mutation';

const updateSellerStatus = (_id, _status) => {
	let responseFromApi;

	let variables = {
		id: _id,
		status: _status
	};

	let mutaionPath = 'user/api/mutations/update_seller_status';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'sellers',
		mutaion_name: 'updateSellerStatus',
		path: 'user/api/queries/sellers_query' //to update query path
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

export { updateSellerStatus };
