import { mutation } from '@/core/methods/mutation';

const createGovernorateAreaTransferPrice = (_variables) => {
	let responseFromApi;

	let variables = {
		from: _variables.from,
		to: _variables.to,
		price: parseFloat(_variables.price),
		commission: parseFloat(_variables.commission),
	};

	let mutaionPath = 'pricing/api/mutations/create_govt_to_area';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'getGovernorateAreaPriceList',
		mutaion_name: 'createGovernorateAreaTransferPrice',
		path: 'pricing/api/queries/govt_to_area_query' //to update query path
	};

	let isVariable = true;

	let methodName = 'create';

	// console.log(">>>>", variables);

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log("Govt to Area",data);
			return data;
		})
		.catch((error) => {
			console.log(error);

			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { createGovernorateAreaTransferPrice };
