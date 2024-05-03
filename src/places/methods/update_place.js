import { mutation } from '@/core/methods/mutation';

const updateGovernorate = (_variables) => {
	let responseFromApi;

	let _areas = [];
	_variables.areas.forEach(element => {
		_areas.push({
			_id: element._id,
			nameEn: element.nameEn,
			nameAr: element.nameAr,
		})
	});

	let variables = {
		id: _variables.id,
		nameEn: _variables.nameEn,
		nameAr: _variables.nameAr,
		areas: _areas,

	};

	// console.log("update old value", variables);

	let mutaionPath = 'places/api/mutations/update_place';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'governorates',
		mutaion_name: 'updateGovernorate',
		path: 'places/api/queries/places_query' //to update query path
	};

	let isVariable = false;
	let methodName = 'update';

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

export { updateGovernorate };
