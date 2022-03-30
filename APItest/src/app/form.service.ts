import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { HttpClientJsonpModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FormService {
   signupAPI = "https://nehatan.herokuapp.com/users/signup";

  constructor(private _http:HttpClient) { }
  public signupuser(name:string,email:string,password:string,number:string){
   return this._http.post<any>(this.signupAPI,{customerName:name,customerEmail:email,customerPassword:password,customerNumber:number})
  }
}
