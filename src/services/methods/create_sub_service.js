const addSubServiceToArray = () => {
	let _newSubService = {};



	// new Sub category object
	let new_sub_service = {
		nameEn: '',
		nameAr: '',
		avatar: null,
		price: 0,
		commission: 0,
		url: null
	};

	_newSubService = new_sub_service;
	return _newSubService;
};

export { addSubServiceToArray };
