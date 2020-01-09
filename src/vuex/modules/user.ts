

import * as types from '../types';
import { Commit } from 'vuex';

// const initPageState = () => {
//   return{
//   	aa:"sdfsd"
//   }
// };

export interface State {
  aa: string;
}

const state:State = {
	aa:"aa"
};

const actions: any = {
  // setAa(context: { commit: Commit }, value: any):void {
  //   context.commit("commitAa", value);
  // },
  setAa (context: { commit: Commit}, value: any) {
    context.commit("commitAa",value)
    // ...
  }
};

const mutations: any = {
  commitAa(state: State, value: any):void{
    state["aa"] = value;
  },
};

const getters: any = {
	aa:(state:State) => state.aa
}


const user = {
	namespaced:true,
  state,
  mutations,
  actions,
  getters
}

export default user;



