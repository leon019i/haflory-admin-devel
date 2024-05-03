import { mutation } from '@/core/methods/mutation';

const updatePolicy = (_variables) => {
	let responseFromApi;

	let variables = _variables;

	// console.log(variables);

	let mutaionPath = 'settings/api/mutations/update_policy';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'policies',
		mutaion_name: 'updatePolicy',
		path: 'settings/api/queries/policies' //to update query path
	};

	let isVariable = false;
	let methodName = 'update';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log(data);
			return data;
		})
		.catch((error) => {
			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { updatePolicy };
