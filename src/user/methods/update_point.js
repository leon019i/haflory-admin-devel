import { mutation } from '@/core/methods/mutation';

const updateConversionPoint = (_variables) => {
	let responseFromApi;

	let variables = {
		id: _variables.id,
		amount: parseFloat(_variables.amount),
		point: parseFloat(_variables.point)
	};

	let mutaionPath = 'user/api/mutations/update_points';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'conversionDetails',
		mutaion_name: 'updateConversionPoint',
		path: 'user/api/queries/points_query' //to update query path
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

export { updateConversionPoint };
