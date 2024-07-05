/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios,{ delayResponse: 2000 })

class Api {
  protected static base_url: string = "https://vercel-backend-one-roan.vercel.app/mobile";
  
  public static post(url:string,reply:any,body?:any) {
    const response = mock.onPost(this.base_url+url,body).reply(200,reply)    
    return response
  }
}

export default Api;
