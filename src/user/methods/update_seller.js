import { mutation } from '@/core/methods/mutation';

const updateDriver = (_variables, limitSkip) => {
	let responseFromApi;

	let variables = {
		id: _variables.id,
		nameEn: _variables.nameEn,
		phone: _variables.phone,
		avatar: _variables.avatar,
		active: _variables.active


	};

	let mutaionPath = 'user/api/mutations/update_seller';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'drivers',
		mutaion_name: 'updateDriver',
		path: 'user/api/queries/sellers_query' //to update query path
	};

	let isVariable = true;
	let methodName = 'update';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName, limitSkip)
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { updateDriver };
