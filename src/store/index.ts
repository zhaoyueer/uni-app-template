import Vue from 'vue';
import Vuex from 'vuex';

import home, { HomeState } from './modules/home';
import global, { GlobalState } from './modules/global';

Vue.use(Vuex);

export interface RootState {
  home: HomeState;
  global: GlobalState;
}

const store = new Vuex.Store<RootState>({
  modules: {
    home,
    global,
  },
});

export default store;
