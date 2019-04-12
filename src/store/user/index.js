import firebase from "firebase";
import router from "@/router";

const userData = {
  state: {
    user: null,
    isAuthenticated: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
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
          commit("setUser", user.user);
          commit("setIsAuthenticated", true);
          router.push("/");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/signin");
        });
    },
    userGoogleSignin({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          if (user.user.email.split("@")[1] == "fashiondata.io") {
            commit("setUser", user.user);
            commit("setIsAuthenticated", true);
            router.push("/");
          } else {
            commit("setUser", null);
            commit("setIsAuthenticated", false);
            router.push("/signin");
          }
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/signin");
        });
    },
    userSignup({ commit }, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit("setUser", user.user);
          commit("setIsAuthenticated", true);
          router.push("/");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/signin");
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", payload);
      commit("setIsAuthenticated", true);
    },
    userSignOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/signin");
        })
        .catch(() => {
          commit("setUser", null);
          commit("setIsAuthenticated", false);
          router.push("/signin");
        });
    }
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
