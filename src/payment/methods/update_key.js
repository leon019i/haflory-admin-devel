import { mutation } from '@/core/methods/mutation';

const updatePaymentKey = (_variables) => {
	let responseFromApi;

	let variables = {
		id: _variables._id,
		paymentKey: _variables.paymentKey,
		paymentConfigType: _variables.paymentConfigType,
		cod: _variables.cod
	};

	// console.log(variables);

	let mutaionPath = 'payment/api/mutations/update_key';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'paymentSetting',
		mutaion_name: 'updatePaymentKey',
		path: 'payment/api/queries/payments_setting' //to update query path
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

export { updatePaymentKey };
