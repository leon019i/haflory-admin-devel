import { mutation } from '@/core/methods/mutation';

const updateAdminContacts = (_variables) => {
	let responseFromApi;

	let variables = {

		_id: _variables._id,
		email: _variables.email,
		phone: _variables.phone,
		whatsapp: _variables.whatsapp,
		instagram: _variables.instagram,
		facebook: _variables.facebook,
		androidLink: _variables.androidLink,
		iosLink: _variables.iosLink,
	};

	// console.log(variables);

	let mutaionPath = 'settings/api/mutations/update_admin_contacts';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'adminContacts',
		mutaion_name: 'updateAdminContacts',
		path: 'settings/api/queries/admin_contacts' //to update query path
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

export { updateAdminContacts };
