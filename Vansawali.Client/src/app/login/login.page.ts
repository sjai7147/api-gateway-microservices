import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';
import { MessageService } from '../core/services/messageService';
import { RegisterService } from '../core/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


@ViewChild('login', {read: ElementRef,static:true}) login:ElementRef;
@ViewChild('register', {read: ElementRef,static:true}) register:ElementRef;
@ViewChild('tabs', {read: ElementRef,static:true}) tabs:ElementRef;
  constructor(private authService:AuthenticationService,
    private messageService:MessageService,
    private registerService:RegisterService) { }

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
  public userLogin(userid:any,pass:any){
    this.registerService.login({UserId:userid.value,Password:pass.value,IsRemember:false}).subscribe((res)=>{
      if(!res.error){
        this.authService.login(res.customData);
      }
    },(error)=>{
      console.log('error in login');
    });
    
  }
  public userRegister(name:any,mobileNo:any,email:any,password:any){
    this.registerService.register({UserId :email.value,Password :password.value,MobileNo :mobileNo.value,Name:name.value}).subscribe((res)=>{
      if(!res.error){
      console.log('user register successfully');
      }
    },(error)=>{
      console.log('error in login');
    });
  }
  public forgotPass(){

  }

}
