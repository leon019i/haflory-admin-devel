import { mutation } from '@/core/methods/mutation';

const updateGovernorateAreaTransferPrice = (_variables) => {
	let responseFromApi;



	let variables = {
		id: _variables.id,
		from: _variables.from,
		to: _variables.to,
		price: parseFloat(_variables.price),
		commission: parseFloat(_variables.commission),
	};

	// console.log("update old value", variables);

	let mutaionPath = 'pricing/api/mutations/update_govt_to_area';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'getGovernorateAreaPriceList',
		mutaion_name: 'updateGovernorateAreaTransferPrice',
		path: 'pricing/api/queries/govt_to_area_query' //to update query path
	};

	let isVariable = true;
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

export { updateGovernorateAreaTransferPrice };
