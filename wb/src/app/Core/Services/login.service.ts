import { Injectable } from '@angular/core';
import { XmlHttpService } from '../../Shared/xml-http-service.service';
import { Login } from '../Model/login';
import { User } from '../Model/user';
import { Message } from '../Model/message';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:XmlHttpService) { }

  public loginUser(user:Login){
    let url='login';
    return this.http.post<User>(url,user);
  }
  public changePass(user:Login){
    let url='changepassword';
    return this.http.post<Message>(url,user);
  }
  public forgotPass(user:Login){
    let url='forgotpassword';
    return this.http.post<Message>(url,user);
  }
}
