import { mutation } from '@/core/methods/mutation';

const updateCategory = (_variables) => {
	let responseFromApi;

	// console.log("update cateory", _variables);

	let subCategory = [];
	_variables.subCategory.forEach(element => {
		subCategory.push({
			_id: element._id,
			nameEn: element.nameEn,
			nameAr: element.nameAr,
			avatar: element.avatar ?? null,
		})
	});

	let variables = {
		id: _variables.id,
		nameEn: _variables.nameEn,
		nameAr: _variables.nameAr,
		order: parseInt(_variables.order),
		active: _variables.active,
		avatar: _variables.avatar,
		subCategories: subCategory,
	};

	// console.log("update cateory", variables);

	let mutaionPath = 'products/api/mutations/update_category';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'categories',
		mutaion_name: 'updateCategory',
		path: 'products/api/queries/categories_query' //to update query path
	};

	let isVariable = true;
	let methodName = 'update';

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log("update category", data)
			return data;
		})
		.catch((error) => {
			console.log("error", error)

			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { updateCategory };
