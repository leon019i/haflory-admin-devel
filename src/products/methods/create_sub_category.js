const addSubCategoryToArray = () => {
	let _newSubCategory = {};



	// new Sub category object
	let new_sub_category = {
		nameEn: 'New Sub Category',
		nameAr: '',
		avatar: null,
		url: null
	};

	_newSubCategory = new_sub_category;
	return _newSubCategory;
};

export { addSubCategoryToArray };
