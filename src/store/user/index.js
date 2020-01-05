import firebase from 'firebase';
import router from '@/router';
import { HOME, SIGN_IN } from '@/constants/router/routes-names';

const userData = {
	state: {
		user: null,
		isAuthenticated: false
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
			firebase
				.auth()
				.currentUser.getIdTokenResult()
				.then(idTokenResult => {
					if (!state.user) return;

					if (idTokenResult.claims == null || idTokenResult.claims.accounts == null) {
						state.user.accounts = [];
					} else {
						state.user.accounts = idTokenResult.claims.accounts;
					}
					if (idTokenResult.claims == null || idTokenResult.claims.studioRoles == null) {
						state.user.studioRoles = 0;
					} else {
						state.user.studioRoles = idTokenResult.claims.studioRoles;
					}
				})
				.catch(error => {
					console.error(error);
				});
		},
		setIsAuthenticated(state, payload) {
			state.isAuthenticated = payload;
		}
	},
	actions: {
		userSignin({ commit }, { email, password }) {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(user => {
					commit('setUser', user.user);
					commit('setIsAuthenticated', true);
					router.push({ name: HOME });
				})
				.catch(() => {
					commit('setUser', null);
					commit('setIsAuthenticated', false);
					router.push({ name: SIGN_IN });
				});
		},
		userGoogleSignin({ commit }) {
			const provider = new firebase.auth.GoogleAuthProvider();

			return new Promise(function(resolve, reject) {
				firebase
					.auth()
					.signInWithPopup(provider)
					.then(user => {
						commit('setUser', user.user);
						commit('setIsAuthenticated', true);
						resolve(user.user);
					})
					.catch(e => {
						commit('setUser', null);
						commit('setIsAuthenticated', false);
						console.error(e);
						reject(e);
					});
			});
		},
		userSignup({ commit }, { email, password }) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(user => {
					commit('setUser', user.user);
					commit('setIsAuthenticated', true);
					router.push({ name: HOME });
				})
				.catch(() => {
					commit('setUser', null);
					commit('setIsAuthenticated', false);
					router.push({ name: SIGN_IN });
				});
		},
		autoSignIn({ commit }, payload) {
			commit('setUser', payload);
			commit('setIsAuthenticated', true);
		},
		userSignOut({ commit }) {
			commit('setUser', null);
			commit('setIsAuthenticated', false);
			router.push({ name: SIGN_IN });
			firebase.auth().signOut();
		}
		// userAddAdminRole({ commit }, email) {
		//   const addAdminRole = firebase.functions().httpsCallable("addAdminRole");
		//   addAdminRole({
		//     email: "romain.chaumais@fashiondata.io",
		//     accounts: ["000010", "000020"]
		//   }).then(result => {
		//     console.log(result);
		//   });
		// },
		// userAddSuperAdminRole({ commit }, email) {
		//   const addSuperAdminRole = firebase
		//     .functions()
		//     .httpsCallable("addSuperAdminRole");
		//   addSuperAdminRole({ email: "romain.chaumais@fashiondata.io" }).then(
		//     result => {
		//       console.log(result);
		//     }
		//   );
		// }
	},
	getters: {
		isAuthenticated(state) {
			return state.isAuthenticated;
		},
		user(state) {
			return state.user;
		},
		getUserAccounts(state, rootState) {
			let items = [];

			state.user.accounts.forEach(id => {
				const element = rootState['accounts/getAccounts'][id];
				if (element) items.push(element);
			});

			return items;
		}
	}
};

export default userData;
