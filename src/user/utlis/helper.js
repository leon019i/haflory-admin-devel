const isAdmin = () => {
	try {
		return localStorage.HAFLORY_ROLE === 'ADMIN';
	} catch (e) {
		return false;
	}
};

const isSeller = () => {
	try {
		return localStorage.HAFLORY_ROLE === 'SELLER';
	} catch (e) {
		return false;
	}
};

// get current user from localstorage
let getCurrentUser = {
	user: JSON.parse(localStorage.HAFLORY_USER)
};

export { isAdmin, isSeller, getCurrentUser };
