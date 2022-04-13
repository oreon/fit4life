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
import { CARDS } from '../constants/Data';

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
  tasks:number[]
  msmts: Msmt[];
  score:number
}

export interface StoreModel {
  todos: Todo[];
  user:string | null
  records: Record[]
  token:string | null
  todays: Record
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

const api = new MainApi(null);

const calcscore = (tasks) =>{
  return _.reduce(tasks, function(sum, n) {
  //   if(n ==undefined) 
  //     return sum
  //   //return sum + n.score 
  //  const sc = (n.score) ? n.score :CARDS[n].score
   return sum + n.score
     
  }, 0);

}

const calcscoreids = (tasks) =>{
 
  return _.reduce(tasks, function(sum, n) {
   const score = (CARDS[n].score) ? (CARDS[n].score): 0
   return sum + score
     
  }, 0);

}

const mystate = {
  
    todos: [],
    records: [],
    user:  null, // 'jay',
    token:null,
    todays:null,
    trks:[],
    //myscore: (state) =>_.sum(_.pick(state.completedTodos, score)),
    completedTodos: computed((state) => state.todos.filter((todo) => todo.done)),
    // score: computed((state) => {
    //   const comps =  state.completedTodos //state.todos.filter((todo) => todo.done)
    //   console.log(comps)
    //   return comps.length
    // }
    //   ),
    score: computed((state) => { 
      return calcscore(state.completedTodos)
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
      //await storeData(today(), storedstate)
      await writeTodays('DONES', state.completedTodos.map( x => x.id))
      try{
        const result = await api.put(`/mark_done/${payload}`, null );
        console.log(result)
      }catch(e){
        console.log("error saving ", payload, e)
      }
      
     // actions.addTodo(result.data);
    }),
  
    logout: action((state:StoreModel) => {
      state.user = null;
      remove('user')
      remove('token')
      //storeData('user', state.user)
    }),
  
    login: action((state:StoreModel, payload) => {
      state.user = payload.username;
      state.token = payload.token
      state.todays = payload.trk
      console.log("stored in state", state.todays)
      storeData('user', state.user)
      storeData("token", payload.token);
     
    }),
    
    setuser: action((state:StoreModel, payload) => {
      state.user = payload;
    }),

    setrecords: action((state:StoreModel, payload) => {
      state.records = payload;
    }),

    read_trks: thunk( async (actions, data ,{getState, getStoreState}) =>{
      const state = getStoreState()
      try {
          
          let trks = await api.get('/trackings')

          trks = trks.map(x =>{
            if(x.tasks)
              x.tasks = JSON.parse(x.tasks);
            else x.tasks = []
            x.day = x.day.split("T")[0]
            x.score = calcscoreids(x.tasks)
            return x
          } )
          state.trks = trks
         }catch(e){
          console.error(e);
         }

         console.log("trks are ", state.trks)
    }),

    register : thunk(async( actions, body) => {
      const res = await api.post('/register/', body) 
      if(res){
        return actions.apilogin(body)
      }
      return("A user probably already exists")  //TODO : standardize error messages on register e.g user already exists
      
    }),

    apilogin: thunk( async (actions, data ) =>{
      try {
        
         let token = await api.login(data);

         if (token) {
           console.log("got token ->", token);
           
           //setUser(user);
           
           api.token = token  //TODO: this should be removed
           const trk = await api.get('/trackings/my_today')
          

           const myprofile = await api.get('/users/me')

           const user = { username: data.username , token:token, trk:trk, profile:myprofile};
           console.log("got trks ", myprofile)

           actions.login(user)
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