import { mutation } from '@/core/methods/mutation';

const updateOrderStatus = (_id, _status) => {
	let responseFromApi;

	let variables = {
		id: _id,
		status: _status
	};

	// console.log(">>>>",variables);
	let mutaionPath = 'orders/api/mutations/update_order_status';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'orders',
		mutaion_name: 'updateOrderStatus',
		path: 'orders/api/queries/orders_query' //to update query path
	};

	let isVariable = false;
	let methodName = 'update';
	// console.log(">>>>");

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log("data")
			// console.log(data)
			return data;
		})
		.catch((error) => {
			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { updateOrderStatus };
