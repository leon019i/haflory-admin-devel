import { mutation } from '@/core/methods/mutation';

const updatePromotion = (_variables) => {
	let responseFromApi;


	let variables = {
		id: _variables.id,
		avatar: _variables.avatar,
		order: parseInt(_variables.order)
	};

	// console.log("variables", variables);

	let mutaionPath = 'settings/api/mutations/update_promotion';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'promotions',
		mutaion_name: 'updatePromotion',
		path: 'settings/api/queries/promotions' //to update query path
	};

	let isVariable = false;
	let methodName = 'update';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log("update promotion", data);

			return data;
		})
		.catch((error) => {
			console.log("error", error);

			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { updatePromotion };
