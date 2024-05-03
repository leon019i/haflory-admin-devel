import { mutation } from '@/core/methods/mutation';

const createCategory = (_variables) => {
	let responseFromApi;

	let subCategory = [];
	_variables.subCategory.forEach(element => {
		subCategory.push({
			nameEn: element.nameEn,
			nameAr: element.nameAr,
			avatar: element.avatar,
		})
	});

	let variables = {
		nameEn: _variables.nameEn,
		nameAr: _variables.nameAr,
		order: parseInt(_variables.order),
		active: _variables.active,
		avatar: _variables.avatar,
		subCategories: subCategory,
	};

	// console.log("variables", variables);

	let mutaionPath = 'products/api/mutations/create_category';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'categories',
		mutaion_name: 'createCategory',
		path: 'products/api/queries/categories_query' //to update query path
	};

	let isVariable = true;
	let methodName = 'create';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log("create", data);

			return data;
		})
		.catch((error) => {
			console.log("error", error);

			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { createCategory };
