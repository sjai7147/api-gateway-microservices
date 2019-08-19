
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginModel,UserDetail } from '../models/UserModels';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
  }); 
  options = {
  headers: this.httpHeaders
  }; 
  private baseUrl='';
  constructor (private httpService: HttpClient) { }  

  login(loginInput:LoginModel):Observable<any>{
    let url='http://localhost:5008/api/Login/userlogin';
    return this.httpService.post(url,loginInput,this.options).pipe(map((data)=>{return data;}));
  }
  register(userDetail:UserDetail):Observable<any>{
    let url='http://localhost:5008/api/RegisterUser/register';
   return this.httpService.post(url,userDetail,this.options).pipe(map((data)=>{return data;}));
  }

}
