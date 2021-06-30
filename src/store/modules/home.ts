import { Module } from 'vuex';
import { RootState } from '../index';

export interface HomeState {
  data: string;
  num: number;
}

/** start of mutations-type */
export const UPDATED_NUM = 'UPDATED_DATA';
/** end of mutations-type */

const Home: Module<HomeState, RootState> = {
  namespaced: true,

  state() {
    return {
      data: 'test data',
      num: 0,
    };
  },

  mutations: {
    [UPDATED_NUM](state, payload: number) {
      state.num = payload;
    },
  },

  actions: {
    async updateNum({ commit, state }) {
      commit(UPDATED_NUM, state.num + 1);
    },
  },
};

export default Home;
