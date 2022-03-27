import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected  instance: AxiosInstance;
  public token :string = null;

  public  constructor(baseURL: string) {
    console.log(baseURL)
    this.init(baseURL)
  }

  private async init  (baseURL){
    if(!this.token){
      this.token = await AsyncStorage.getItem("token");
      console.log("read token ", this.token)
    }
    
    this.instance = axios.create({
      baseURL,
      // headers: {
      //   'Authorization': 'Token ' + this.token 
      // }
    });

    this._initializeResponseInterceptor();
  }



  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
    //  this._handleError,
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  // protected _handleError = (error: any) => {
  //   console.log("error -> in", error)
  //   Promise.reject(error);
  // }
}