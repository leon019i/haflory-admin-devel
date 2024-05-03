import { mutation } from '@/core/methods/mutation';

const updateProduct = (_variables) => {
	let responseFromApi;

	let _varients = [];
	_variables.variants.forEach(element => {
		_varients.push({
			_id: element._id,
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
		id: _variables.id,
		nameEn: _variables.nameEn,
		nameAr: _variables.nameAr,
		descriptionEn: _variables.descriptionEn,
		descriptionAr: _variables.descriptionAr,
		subCategory: _variables.subCategory,
		createdBy: _variables.createdBy,
		avatar: _avatar,
		featured: _variables.featured,
		active: _variables.active,
		order: parseFloat(_variables.order),
		price: parseFloat(_variables.price),
		quantity: parseInt(_variables.quantity),
		sku: _variables.sku,
		variants: _varients,
		sizeChart: _variables.sizeChart
	};

	// console.log("update old value", variables);

	let mutaionPath = 'products/api/mutations/update_product';

	// This is to read cache data and update
	let readQueryFromStore = {
		query_name: 'products',
		mutaion_name: 'updateProduct',
		path: 'products/api/queries/product_query' //to update query path
	};

	let isVariable = true;
	let methodName = 'update';

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

export { updateProduct };
