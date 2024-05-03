import { query } from '@/core/methods/query';

const getSellers = (limit, skip) => {
	let allSellers = [];
	let variables = {
		limit: limit,
		skip: skip
	};
	let queryPath = 'user/api/queries/sellers_query';
	allSellers = query(variables, queryPath);

	return allSellers;
};

export { getSellers };
