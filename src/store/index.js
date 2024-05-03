import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		rtl: false,
		show_left_drawer: false,
		show_drawer: false,
		drawer_action_name: '',
		show_app_drawer: true,
		current_object: {}
	},
	getters: {
		rtl: (state) => state.rtl,
		show_left_drawer: (state) => state.show_left_drawer,
		show_drawer: (state) => state.show_drawer,
		is_drawer: (state) => state.drawer_action_name,
		show_app_drawer: (state) => state.show_app_drawer,
		current_object: (state) => state.current_object,
	},
	mutations: {
		UPDATE_RTL: (state, value) => {
			state.rtl = value;
		},
		UPDATE_LEFT_DRAWER: (state, value) => {
			state.show_left_drawer = value;
		},
		SHOW_DRAWER: (state, actionName) => {
			state.show_drawer = !state.show_drawer;
			state.drawer_action_name = actionName;
		},
		SHOW_APP_DRAWER: (state) => {
			state.show_app_drawer = !state.show_app_drawer;
		},
		UPDATE_OBJ: (state, object) => {
			state.current_object = object;
		},
	},
	actions: {
		showSideDrawer({ commit }, actionName) {
			commit('SHOW_DRAWER', actionName);
		},
		showAppDrawer({ commit }) {
			commit('SHOW_APP_DRAWER');
		},
		updateObject({ commit }, object) {
			commit('UPDATE_OBJ', object);
		}
	}
});
