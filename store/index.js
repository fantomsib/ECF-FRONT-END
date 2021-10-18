import {vAssign} from "./lib"

export const state = () => ({
  isAuth: false,
  token: null,
  me: {},
  drawer: false,
  alerts: [],
  loading: false,
  genres: {},
  authors: {}

});

export const mutations = {
  me(state, val) {
    state.me = vAssign({}, val);
  },
  token(state, val) {
    state.token = val;
  },
  logout(state){
    state.token = '';
    state.me = {};
    state.isAuth = false;
  },
  isAuth(state, val) {
    state.isAuth = val;
  },
  loading(state, val) {
    state.loading = val;
  },
  alerts(state, val) {
    state.alerts.push(val);

    setTimeout(() => {
      this.commit('alertClose', state.alerts.findIndex(v => v === val));
    }, 5000);

  },
  alertClear(state) {
    state.alerts = [];
  },
  alertClose(state, index) {
    state.alerts = vAssign([], state.alerts.splice(index, 1));
  },
  drawer(state, val) {
    state.drawer = val;
  },
  genres(state, val) {
    state.genres = val;
  },
  authors(state, val) {
    state.authors = val;
  }
};
