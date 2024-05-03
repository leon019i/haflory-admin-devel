import { onSignin, apolloClient } from '@/plugins/vue-apollo.js';
import { mutation } from '@/core/methods/mutation';

const userSignIn = (phone, password) => {
	let auth;
	let variables = {
		phone: phone,
		password: password
	};
	let mutaionPath = 'user/api/mutations/signin_mutaion';
	auth = mutation(variables, mutaionPath)
		.then((data) => {
			return setUserAndToken(apolloClient, data);
		})
		.catch((error) => {
			return JSON.stringify(error.message);
		});
	return auth;
};

// set role & user & token
function setUserAndToken(apolloClient, data) {
	onSignin(apolloClient, data.data.userSignIn.token);

	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('HAFLORY_USER', JSON.stringify(data.data.userSignIn.user));
		localStorage.setItem('HAFLORY_ROLE', data.data.userSignIn.user.role);
	}
	location.reload();
	return 'success';
}

export { userSignIn };
