import { mutation } from '@/core/methods/mutation';

const createGovernorate = (_variables) => {
	let responseFromApi;

	let variables = {
		nameEn: _variables.nameEn,
		nameAr: _variables.nameAr,
		areas: _variables.areas,
	};

	let mutaionPath = 'places/api/mutations/create_place';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'governorates',
		mutaion_name: 'createGovernorate',
		path: 'places/api/queries/places_query' //to update query path
	};

	let isVariable = false;

	let methodName = 'create';

	// console.log(">>>>", variables);

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log(data);
			return data;
		})
		.catch((error) => {
			console.log(error);

			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { createGovernorate };
