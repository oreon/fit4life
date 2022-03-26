import axios from 'axios';
import { createStore, computed, action, thunk, Computed, Action, Thunk, createTypedHooks, persist } from 'easy-peasy';
//import { StoreModel } from './model';
import * as _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from './storage';
import { remove, storeData, writeTodays } from './AsyncStorageHelper';

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

export interface StoreModel {
  todos: Todo[];
  user:string | null
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

const mystate = {
  

  
    todos: [],
    user: null,
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
      console.log("foound todo with id ", payload, todo)
      todo.done = true
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
    saveTodo: thunk(async (actions, payload) => {
      const result = await axios.post('/todos', payload);
      actions.addTodo(result.data);
    }),
  
}

const store = createStore<StoreModel>(
mystate
//   persist(mystate),
//   {
//     storage: AsyncStorage
// }
  
);

export default store