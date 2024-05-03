import { apolloClient } from '@/plugins/vue-apollo.js';

const query = async (_variables, _path) => {
	let getDataFromApi = [];

	let fullPath = getFullPath(_path);

	getDataFromApi = await apolloClient.query({
		query: fullPath,
		variables: _variables
	});

	return getDataFromApi;
};

//concat full path

let getFullPath = (_path) => require('@/' + _path + '.graphql');

export { query };
