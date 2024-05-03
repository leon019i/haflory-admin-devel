import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '../plugins/i18n.js';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: `/${i18n.locale}`
	},
	{
		path: '/:lang',
		component: {
			render: (h) => h('router-view')
		},
		children: [
			{
				path: '',
				name: 'Dashboard',
				component: () => import(/* webpackChunkName: "Dashboard" */ '@/user/pages/Dashboard.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: 'places',
				name: 'Places',
				component: () => import(/* webpackChunkName: "Places" */ '@/places/pages/Places.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: 'services',
				name: 'Services',
				component: () => import(/* webpackChunkName: "Services" */ '@/services/pages/Services.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: 'drivers',
				name: 'Drivers',
				component: () => import(/* webpackChunkName: "Drivers" */ '@/user/pages/Driver.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: 'users',
				name: 'Users',
				component: () => import(/* webpackChunkName: "kids" */ '@/user/pages/Users.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: 'payments',
				name: 'Payments',
				component: () => import(/* webpackChunkName: "Payments" */ '@/payment/pages/Payments.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: 'pricing',
				name: 'Pricing',
				component: () => import(/* webpackChunkName: "Pricing" */ '@/pricing/pages/Pricing.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: 'accounts',
				name: 'Accounts',
				component: () => import(/* webpackChunkName: "Accounts" */ '@/accounts/pages/Accounts.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: 'settings',
				name: 'Settings',
				component: () => import(/* webpackChunkName: "Settings" */ '@/settings/pages/AppSettings.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: 'notification',
				name: 'Notification',
				component: () => import(/* webpackChunkName: "Notification" */ '@/notification/pages/Notification.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: 'orders',
				name: 'Orders',
				component: () => import(/* webpackChunkName: "Orders" */ '@/orders/pages/Orders.vue'),
				meta: { requiresAuth: true }
			},
			{
				path: 'chats',
				name: 'Chats',
				component: () => import(/* webpackChunkName: "Chats" */ '@/chat/pages/ChatPage.vue'),
				meta: { requiresAuth: true }
			},

			{
				path: 'signin',
				name: 'Signin',
				component: () => import(/* webpackChunkName: "SignIn" */ '@/user/pages/SignIn.vue'),
				meta: { redirectAuthUser: true }
			}
		]
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	const auth = localStorage.getItem('apollo-token-haflory');

	let language = to.params.lang;
	if (!language) {
		language = 'en';
	}
	i18n.locale = language;

	// redirect unauth users to Signin  page
	if (to.meta.requiresAuth && !auth) {
		next({ name: 'Signin', params: { lang: i18n.locale } });
	} else if (to.meta.redirectAuthUser && auth) {
		// redirect Dashboard page for autheticated users
		next({ name: 'Dashboard', params: { lang: i18n.locale } });
	} else {
		next();
	}
});
export default router;
