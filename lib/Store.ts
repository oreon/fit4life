import React from 'react';
import axios from 'axios';
import { createStore, computed, action, thunk, Computed, Action, Thunk, createTypedHooks, persist } from 'easy-peasy';
//import { StoreModel } from './model';
import * as _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from './storage';
import { remove, storeData, writeTodays } from './AsyncStorageHelper';


import MainApi from "../api/MainApi";
import { ActionSheetIOS } from 'react-native';
import { today } from './helpers';
import Toast from 'react-native-root-toast';

type User = null | { username: string 
  token:string};

export interface TodosModel {
  todos: Todo[];
  completedTodos: Computed<TodosModel, Todo[]>;
  addTodo: Action<TodosModel, Todo>;
  saveTodo: Thunk<TodosModel, Todo>;
}

export interface Todo {
  id:number
  title:string
  text: string;
  done: boolean;
  cardtype: string
  mfile:string
  score:number
}

//Measurement
export interface Msmt{
  name:string
  val:number
}

export interface Record {
  date:string
  dones:number[]
  msmts: Msmt[];
  score:number
}

export interface StoreModel {
  todos: Todo[];
  user:string | null
  records: Record[]
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

const api = new MainApi(null);

const mystate = {
  
    todos: [],
    records: [],
    user: 'ay',
    //myscore: (state) =>_.sum(_.pick(state.completedTodos, score)),
    completedTodos: computed((state) => state.todos.filter((todo) => todo.done)),
    // score: computed((state) => {
    //   const comps =  state.completedTodos //state.todos.filter((todo) => todo.done)
    //   console.log(comps)
    //   return comps.length
    // }
    //   ),
    score: computed((state) => { 
      const scores = state.completedTodos
      
      return _.reduce(scores, function(sum, n) {
        return sum + n.score;
      }, 0);
    }  ),
    addTodo: action((state:StoreModel, payload) => {
      state.todos.push(payload);
    }),
  
    markdone: action((state:StoreModel, payload) => {
      let todo : Todo= _.find(state.todos, {id:payload});
      
      todo.done = true
      // console.log("bef", state.todos)
      // //state.todos = {...state.todos,...todo}
      // console.log("after",state.todos)

      //TODO : this code is buggy and only saving the previous state without the latest todo
      const comps = state.completedTodos
     
    }),

    saveTodo: thunk(async (actions, payload, {getState, getStoreState}) => {
      actions.markdone(payload)
      const state = getStoreState()
      console.log("state ", state)
      const storedstate = {
        dones: state.completedTodos.map( x => x.id),
        score:state.score
      }
      await storeData(today(), storedstate)
      //const result = await axios.post('/todos', payload);
     // actions.addTodo(result.data);
    }),
  
    logout: action((state:StoreModel) => {
      state.user = null;
      remove('user')
      //storeData('user', state.user)
    }),
  
    login: action((state:StoreModel, payload) => {
      state.user = payload;
      storeData('user', state.user)
     
    }),
    
    setuser: action((state:StoreModel, payload) => {
      state.user = payload;
    }),

    setrecords: action((state:StoreModel, payload) => {
      state.records = payload;
    }),

  

    apilogin: thunk( async (actions, data ) =>{
      try {
         data = {username:'singhjess@gmail.com', passoword:'mohali76'}
         let token = await api.login(data);
         if (token) {
           console.log("got token ->", token);
           const user = { username: data.username , token:token.token};
           //setUser(user);
           actions.login(data.usernamej)
           api.token = token.token
           await AsyncStorage.setItem("token", token.token);
   
          //  try {
          //    let plan = await api.todays();
          //    setPlan(plan)
          //  } catch (error) {
          //    console.error("there was an error getting profile");
          //    return error;
          //  }
          
           return true;
         }
       } catch (error) {
         console.log("an error occured loggin in ", error)
         return false;
       }
      
     })
  
}

const store = createStore<StoreModel>(
mystate
//   persist(mystate),
//   {
//     storage: AsyncStorage
// }
  
);

export default store