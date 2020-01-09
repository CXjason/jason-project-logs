

import * as types from '../types';
import { Commit } from 'vuex';

// const initPageState = () => {
//   return{
//   	aa:"sdfsd"
//   }
// };

export interface State {
  aa: string;
  userInfo:object;
}

const state:State = {
  aa:"aa",
  userInfo:{}
};

const actions: any = {
  setAa (context: { commit: Commit}, value: any) {
    context.commit("commitAa",value)
  },
  setUserInfo(context: { commit: Commit}, value: any) {
    context.commit("commitUserInfo",value)
  },
};

const mutations: any = {
  commitAa(state: State, value: any):void{
    state["aa"] = value;
  },
  commitUserInfo(state: State, value: any):void{
    state.userInfo = value;
  },
};

const getters: any = {
	aa:(state:State) => state.aa,
	userInfo:(state:State) => state.userInfo,
}


const user = {
	namespaced:true,
  state,
  mutations,
  actions,
  getters
}

export default user;



