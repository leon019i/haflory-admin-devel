import { mutation } from '@/core/methods/mutation';

const deletePromotion = (_variables) => {
	let responseFromApi;

	let variables = {
		id: _variables._id
	};

	let mutaionPath = 'settings/api/mutations/delete_promotion';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'promotions',
		mutaion_name: 'deletePromotion',
		path: 'settings/api/queries/promotions' //to update query path
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

export { deletePromotion };
