import { Module } from 'vuex';
import { RootState } from '../index';

export type CourseContentEnvType = 'staging' | 'dev';

export interface GlobalState {
  requestJumped: boolean;
}

/** start of mutations-type */
export const UPDATED_JUMPED = 'UPDATED_JUMPED';
/** end of mutations-type */

const Global: Module<GlobalState, RootState> = {
  namespaced: true,

  state() {
    return {
      requestJumped: false,
    };
  },

  mutations: {
    [UPDATED_JUMPED](state, payload: boolean) {
      state.requestJumped = payload;
    },
  },

  actions: {},
};

export default Global;
