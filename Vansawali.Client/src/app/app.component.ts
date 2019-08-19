import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './core/authentication.service';
import { MessageService } from './core/services/messageService';
import { MenuModel,Menu } from '../app/core/models/menuModel';
import { Storage } from '@ionic/storage';
const TOKEN_KEY = 'auth-token';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy,OnInit {
 
  ngOnInit() {
    this.appPages= Menu.UserView;
    this.messageService.getMessage().subscribe(m=>{     
      // if(this.appPages.find(p=>p.title===m.title)){
      //   //menu already exists
      // }else{
      //   this.appPages.push(m.message);
      //   //this.route.navigate([m.message.url]);
      // }
     
    });
  }
  public appPages = Array<any>();
 public username:string=' Guest';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route:Router,
    private authentication:AuthenticationService,
    private messageService:MessageService,
    private storage: Storage,
  ) {
    this.initializeApp();
    
  }
  ngOnDestroy(): void {
    this.authentication=null;
  }
  menuClick(title:string){
    if(title.toLocaleLowerCase()==="logout"){
      this.authentication.logout();
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authentication.authenticationState.subscribe(state=>{
        if(state){
          this.storage.get(TOKEN_KEY).then(res => {
            if (res) {             
              this.username=res.UserName;
            }
          })
          
           this.route.navigate(['/admin']);         
        // let loginFound=  this.appPages.find(l=>{
        //       return  l.title.toLocaleLowerCase()==='admin';                                
        //   });
        //   if(loginFound){
        //     this.appPages.splice(0,1);
        //   }
        this.appPages=Menu.AdminView;
        }else{
          this.username=" Guest ";
          if(this.appPages===Menu.AdminView)
          this.appPages= Menu.UserView;
          this.route.navigate(['/home']);
        }
      })
     });
  }
}
