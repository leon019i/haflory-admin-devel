import { mutation } from '@/core/methods/mutation';

const updateUser = (_variables) => {
	let responseFromApi;

	let variables = {
		id: _variables.id,
		nameEn: _variables.nameEn,
		nameAr: _variables.nameAr,
		email: _variables.email,
		phone: _variables.phone,
		avatar: _variables.avatar,
		// active: _variables.active
	};

	let mutaionPath = 'user/api/mutations/update_user';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'sellers',
		mutaion_name: 'updateUser',
		path: 'user/api/queries/sellers_query' //to update query path
	};

	let isVariable = false;
	let methodName = 'update';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { updateUser };
