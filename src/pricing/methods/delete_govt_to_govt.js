import { mutation } from '@/core/methods/mutation';

const deleteGovernorateTransferPrice = (_variables, limitSkip) => {
	let responseFromApi;

	let variables = {
		id: _variables._id
	};
	// console.log(variables);


	let mutaionPath = 'pricing/api/mutations/delete_govt_to_govt';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'getGovernoratePriceList',
		mutaion_name: 'deleteGovernorateTransferPrice',
		path: 'pricing/api/queries/govt_to_govt_query' //to update query path
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

export { deleteGovernorateTransferPrice };
