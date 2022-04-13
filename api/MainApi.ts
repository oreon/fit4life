import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Article } from '../models/types';
import {HttpClient} from './http-client-interceptor'
//import { User } from './types';

//const ROOT_URL = 'https://easyslimandfit.com/api'   
//const ROOT_URL =  'http://10.0.2.2:8000/api'
const ROOT_URL =  'http://127.0.0.1:8000/api'




export default class MainApi extends HttpClient {

  
  public constructor(token) {
    super(ROOT_URL);  //TODO: put this in file
    this.token = token
  }


  async  get(url) {
    console.log("calling get with ", this.token)
    try {

      const response = await this.instance.get(url,
        {
          headers: {'Authorization': `Token ${this.token}` }
        }
        ) 
      console.log("get response" , response);
      return response
    } catch (error) {
      console.error(error);
    }
  }

  async  post(url, body) {
    console.log("calling post with ", body);
    const hdrs = undefined
    if(this.token){
      const hdrs = {'Authorization': 'Token ' + this.token }
    }
    try {
      const response = await this.instance.post(url, body,{

        headers: hdrs
      }) 
      console.log(response);
      return response
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  async  put(url, body) {
    try {
      return await this.instance.put(url, body,{
        headers: {'Authorization': 'Token ' + this.token }
      }) 
      
    } catch (error) {
      console.error(error);
    }
  }

  async  delete(url, body?) {
    try {
      const response = await this.instance.delete(url, body) //('/user?ID=12345');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

   login = async ( body) =>  //await this.instance.post(ROOT_URL +'/auth-token/',body). ['token']
   {
    try {
      console.log("calling with ", body)
      const response = await this.instance.post(ROOT_URL +'/auth-token/',body)  //{'username':'xx', 'password':'yy'}
      console.log(response);
      return response['token'];
      
    } catch (error) {
      console.error(error);
    }

  }


  register = async( body) => this.instance.post('/register/', body)

  myprofile = async() => this.get('/users/me/' )

  todays = async() => this.get('/todays/' )
//     try {
//       const response = await this.instance.post('/register/', body) //('/user?ID=12345');
//       return response
//     //   if(response.status != 201){
//     //       return response.error.body
//     //   }
//      // return response['data']
//     } catch (error) {
//       console.error(error);
//       return error
//     }
//   }

    public getArticles = () => this.instance.get<Article[]>('/articles/');
    public getRecipes = () => this.instance.get<Article[]>('/recipes/');
  
    //public getRecipe = (id: string) => this.instance.get<User>(`/recipes/${id}`);
}