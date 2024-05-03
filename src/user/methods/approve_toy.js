import { mutation } from '@/core/methods/mutation';

const changeApprovalStatus = (_id, _status) => {
	let responseFromApi;

	let variables = {
		id: _id,
		approved: _status
	};

	let mutaionPath = 'user/api/mutations/approve_toy';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'pendingApprovalList',
		mutaion_name: 'changeApprovalStatus',
		path: 'user/api/queries/pending_approval_list_query' //to update query path
	};

	let isVariable = true;

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

export { changeApprovalStatus };
