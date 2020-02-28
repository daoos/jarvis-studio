import { ActionTree } from 'vuex';
import { RootState, UserState } from '@/types';
import firebase, { User } from 'firebase';
import store from '@/store';
import router from '@/router';
import { HOME, SIGN_IN } from '@/constants/router/routes-names';
import { usersSocialInformation } from '@/store/modules/easy-firestore/users-social-information';
import { connectionsHistory } from '@/store/modules/easy-firestore/connections-history';

const setSocialInformation = (user: User | null) => {
	if (!user) return;

	store.dispatch(`${usersSocialInformation.moduleName}/set`, {
		id: user!.uid,
		disabled: false,
		deleted: false,
		displayName: user!.displayName,
		photoURL: user!.photoURL,
		email: user!.email
	});

	store.dispatch(`${connectionsHistory.moduleName}/insert`, {
		userId: user!.uid,
		date: firebase.firestore.Timestamp.now()
	});
};

export const actions: ActionTree<UserState, RootState> = {
	signIn({ commit }, { email, password }) {
		return new Promise(function(resolve, reject) {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(user => {
					commit('setUser', user.user);
					commit('setIsAuthenticated', true);
					setSocialInformation(user.user);
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
					setSocialInformation(user.user);
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
				setSocialInformation(user.user);
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
};
