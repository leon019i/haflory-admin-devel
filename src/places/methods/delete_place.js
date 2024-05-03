import { mutation } from '@/core/methods/mutation';

const deleteGovernorate = (_variables, limitSkip) => {
	let responseFromApi;

	let variables = {
		id: _variables._id
	};

	let mutaionPath = 'places/api/mutations/delete_place';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'governorates',
		mutaion_name: 'deleteGovernorate',
		path: 'places/api/queries/places_query' //to update query path
	};

	let isVariable = false;

	let methodName = 'delete';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName, limitSkip)
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { deleteGovernorate };
