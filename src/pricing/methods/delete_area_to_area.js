import { mutation } from '@/core/methods/mutation';

const deleteAreaTransferPrice = (_variables, limitSkip) => {
	let responseFromApi;

	let variables = {
		id: _variables._id
	};
	// console.log(variables);


	let mutaionPath = 'pricing/api/mutations/delete_area_to_area';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'getAreaPriceList',
		mutaion_name: 'deleteAreaTransferPrice',
		path: 'pricing/api/queries/area_to_area_query' //to update query path
	};

	let isVariable = true;

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

export { deleteAreaTransferPrice };
