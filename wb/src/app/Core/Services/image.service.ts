import { Injectable } from '@angular/core';
import { XmlHttpService } from '../../Shared/xml-http-service.service';
import { Login } from '../Model/login';
import { User } from '../Model/user';
import { Message } from '../Model/message';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:XmlHttpService) { }

  public userImages(user:Login){
    let url='userimages';
    return this.http.get<User>(url);
  }
  public allUserImages(){
    let url='alluserimages';
    return this.http.get<User>(url);
  }
 
}
