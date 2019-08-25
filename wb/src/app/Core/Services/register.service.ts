import { Injectable } from '@angular/core';
import { XmlHttpService } from '../../Shared/xml-http-service.service';
import { User } from '../Model/user';
import { Observable } from 'rxjs';
import { Message } from '../Model/message';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( private service:XmlHttpService) { }

  public registerUser(user:User):Observable<Message>{
    let url='register';
    return this.service.post<Message>(url,user);
  }
  public updateUser(user:User):Observable<Message>{
    let url='updateuser';
    return this.service.post<Message>(url,user);
  }
  public listUser(user:User):Observable<User>{
    let url='listuser';
    return this.service.post<Observable<User>>(url,user);
  }
}
