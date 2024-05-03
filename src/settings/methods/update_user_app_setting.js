import { mutation } from '@/core/methods/mutation';

const updateUserConfigApp = (_variables) => {
	let responseFromApi;

	let variables = {

		orderLimit: parseInt(_variables.orderLimit),

		openingHour: _variables.openingHour,

		closingHour: _variables.closingHour
	};

	// console.log(variables);

	let mutaionPath = 'settings/api/mutations/update_customer_app_settings';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'userAppConfig',
		mutaion_name: 'updateUserConfigApp',
		path: 'settings/api/queries/user_app_setting' //to update query path
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

export { updateUserConfigApp };
