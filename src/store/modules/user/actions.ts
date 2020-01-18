import { ActionTree } from 'vuex';
import { RootState, UserState } from '@/types';
import firebase from 'firebase';
import router from '@/router';
import { HOME, SIGN_IN } from '@/constants/router/routes-names';

export const actions: ActionTree<UserState, RootState> = {
	signIn({ commit }, { email, password }) {
		return new Promise(function(resolve, reject) {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(user => {
					commit('setUser', user.user);
					commit('setIsAuthenticated', true);
					resolve(user.user);
				})
				.catch(e => {
					reject(e);
				});
		});
	},
	googleSignIn({ commit }) {
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
					reject(e);
				});
		});
	},
	signUp({ commit }, { email, password }) {
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
	alreadySignedIn({ commit }, payload) {
		commit('setUser', payload);
		commit('setIsAuthenticated', true);
	},
	signOut({ commit }) {
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
};
