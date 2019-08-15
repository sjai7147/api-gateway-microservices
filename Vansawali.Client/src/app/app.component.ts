import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './core/authentication.service';
import { MessageService } from './core/services/messageService';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy,OnInit {
 
  ngOnInit() {
    this.messageService.getMessage().subscribe(m=>{     
      if(this.appPages.find(p=>p.title===m.title)){
        //menu already exists
      }else{
        this.appPages.push(m.message);
        //this.route.navigate([m.message.url]);
      }
     
    });
  }
  public appPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'login'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Sajara',
      url: '/sajara',
      icon: 'sajara'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route:Router,
    private authentication:AuthenticationService,
    private messageService:MessageService
  ) {
    this.initializeApp();
  }
  ngOnDestroy(): void {
    this.authentication=null;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authentication.authenticationState.subscribe(state=>{
        if(state){
          this.route.navigate(['/admin']);         
        let loginFound=  this.appPages.find(l=>{
              return  l.title.toLocaleLowerCase()==='admin';                                
          });
          if(loginFound){
            this.appPages.splice(0,1);
          }
        }else{
          this.route.navigate(['/home']);
        }
      })
     });
  }
}
