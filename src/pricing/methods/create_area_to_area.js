import { mutation } from '@/core/methods/mutation';

const createAreaTransferPrice = (_variables) => {
	let responseFromApi;

	let variables = {
		from: _variables.from,
		to: _variables.to,
		price: parseFloat(_variables.price),
		commission: parseFloat(_variables.commission),
	};

	let mutaionPath = 'pricing/api/mutations/create_area_to_area';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'getAreaPriceList',
		mutaion_name: 'createAreaTransferPrice',
		path: 'pricing/api/queries/area_to_area_query' //to update query path
	};

	let isVariable = true;

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

export { createAreaTransferPrice };
