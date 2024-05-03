const addProductVarientToArray = () => {
	let _newProductVarient = {};

	// random id & order
	// let newId = Math.ceil(Math.random() * 100000000);

	// let newOder = Math.ceil(Math.random() * 1000);

	// new Sub category object
	let new_varient = {
		nameEn: 'Small',
		nameAr: '',
		quantity: 0
	};

	_newProductVarient = new_varient;
	return _newProductVarient;
};

export { addProductVarientToArray };
