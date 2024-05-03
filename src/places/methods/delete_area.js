import { mutation } from '@/core/methods/mutation';

const deleteArea = (_variables) => {
	let responseFromApi;

	let variables = {
		id: _variables
	};

	let mutaionPath = 'places/api/mutations/delete_area';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'governorates',
		mutaion_name: 'deleteArea',
		path: 'places/api/queries/places_query' //to update query path
	};

	let isVariable = false;

	let methodName = 'delete';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log(data)
			return data;
		})
		.catch((error) => {
			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { deleteArea };
