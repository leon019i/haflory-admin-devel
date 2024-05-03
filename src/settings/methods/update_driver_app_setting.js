import { mutation } from '@/core/methods/mutation';

const updateDriverConfigApp = (_variables) => {
	let responseFromApi;

	let variables = {

		pendingOrders: parseInt(_variables.pendingOrders),
		acceptableOrders: parseInt(_variables.acceptableOrders),
		orderDisplayTime: _variables.orderDisplayTime,
		transferLimit: parseInt(_variables.transferLimit)
	};

	// console.log(variables);

	let mutaionPath = 'settings/api/mutations/update_driver_app_setting';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'driverAppConfig',
		mutaion_name: 'updateDriverConfigApp',
		path: 'settings/api/queries/driver_app_setting' //to update query path
	};

	let isVariable = false;
	let methodName = 'update';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log(data);
			return data;
		})
		.catch((error) => {
			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { updateDriverConfigApp };
