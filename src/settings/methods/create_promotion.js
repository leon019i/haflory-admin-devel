import { mutation } from '@/core/methods/mutation';

const createPromotion = (_variables) => {
	let responseFromApi;


	let variables = {
		avatar: _variables.avatar,
		order: parseInt(_variables.order)
	};

	// console.log("variables", variables);

	let mutaionPath = 'settings/api/mutations/create_promotion';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'promotions',
		mutaion_name: 'createPromotion',
		path: 'settings/api/queries/promotions' //to update query path
	};

	let isVariable = true;
	let methodName = 'create';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log("create promotion", data);

			return data;
		})
		.catch((error) => {
			console.log("error", error);

			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { createPromotion };
