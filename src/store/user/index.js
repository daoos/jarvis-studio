import firebase from 'firebase';
import index from '@/router';

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
					index.push('/');
				})
				.catch(() => {
					commit('setUser', null);
					commit('setIsAuthenticated', false);
					index.push({ name: 'SignIn' });
				});
		},
		userGoogleSignin({ commit }) {
			const provider = new firebase.auth.GoogleAuthProvider();
			firebase
				.auth()
				.signInWithPopup(provider)
				.then(user => {
					commit('setUser', user.user);
					commit('setIsAuthenticated', true);
					index.push('/');
				})
				.catch(() => {
					commit('setUser', null);
					commit('setIsAuthenticated', false);
					index.push({ name: 'SignIn' });
				});
		},
		userSignup({ commit }, { email, password }) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(user => {
					commit('setUser', user.user);
					commit('setIsAuthenticated', true);
					index.push('/');
				})
				.catch(() => {
					commit('setUser', null);
					commit('setIsAuthenticated', false);
					index.push({ name: 'SignIn' });
				});
		},
		autoSignIn({ commit }, payload) {
			commit('setUser', payload);
			commit('setIsAuthenticated', true);
		},
		userSignOut({ commit }) {
			index.push({ name: 'SignIn' });
			firebase
				.auth()
				.signOut()
				.then(() => {
					commit('setUser', null);
					commit('setIsAuthenticated', false);
				})
				.catch(() => {
					commit('setUser', null);
					commit('setIsAuthenticated', false);
				});
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
		}
	}
};

export default userData;
