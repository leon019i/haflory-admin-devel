import { mutation } from '@/core/methods/mutation';

const createProduct = (_variables) => {
	let responseFromApi;

	let _varients = [];
	_variables.variants.forEach(element => {
		_varients.push({
			nameEn: element.nameEn,
			nameAr: element.nameAr,
			quantity: parseInt(element.quantity),
		})
	});

	let _avatar = [];
	_variables.avatar.forEach(element => {
		_avatar.push(
			element.avatar,
		)
	});


	let variables = {
		nameEn: _variables.nameEn,
		nameAr: _variables.nameAr,
		descriptionEn: _variables.descriptionEn,
		descriptionAr: _variables.descriptionAr,
		subCategory: _variables.subCategory,
		createdBy: _variables.createdBy,
		avatar: _avatar,
		featured: _variables.featured,
		active: _variables.active,
		price: parseFloat(_variables.price),
		order: parseFloat(_variables.order),
		quantity: parseInt(_variables.quantity),
		sku: _variables.sku,
		variants: _varients,
		sizeChart: _variables.sizeChart
	};

	let mutaionPath = 'products/api/mutations/create_product';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'products',
		mutaion_name: 'createProduct',
		path: 'products/api/queries/product_query' //to update query path
	};

	let isVariable = true;

	let methodName = 'create';

	// console.log(">>>>", variables);

	responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
		.then((data) => {
			// console.log(data);
			return data;
		})
		.catch((error) => {
			console.log(error);

			return JSON.stringify(error.message);
		});
	return responseFromApi;
};

export { createProduct };
