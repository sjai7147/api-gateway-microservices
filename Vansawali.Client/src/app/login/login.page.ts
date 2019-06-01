import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

@ViewChild('login') login:ElementRef;
@ViewChild('register') register:ElementRef;
@ViewChild('tabs') tabs:ElementRef;
  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
  }
 public toggleTab(status:boolean,event:any):void{
 
   for(let i=0;i<this.tabs.nativeElement.children.length;i++){
    this.tabs.nativeElement.children[i].setAttribute('class','li-list');
   }
   event.currentTarget.setAttribute('class','li-list li-active');
    if(!status){
      this.register.nativeElement.style['display']='block';
      this.login.nativeElement.style['display']='none';
     
    }else{
      this.register.nativeElement.style['display']='none';
      this.login.nativeElement.style['display']='block';
     
    }
  }
  public userLogin(){
    this.authService.login();
  }
  public userRegister(){

  }
  public forgotPass(){

  }

}
