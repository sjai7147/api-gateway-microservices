import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './Core/Services/authentication.service';
import { Storage } from '@ionic/storage';
import { User } from './Core/Model/user';
import Menues from '../app/Core/Model/menues';

const TOKEN_KEY = 'auth-token';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public userName:string='Guest'
  public appPages = Array<Object>();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route:Router,
    private auth:AuthenticationService,
    private storage:Storage
  ) {
    this.appPages=new Menues().munuList;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.auth.authenticationState.subscribe((state)=>{
        state&&(this.storage.get(TOKEN_KEY).then((data)=>{
          let usr=data as User;
          this.route.navigate(['/home']);
          //ToDo: We will assign user Name in 
          //this.userName=usr.Name;
        }))
        ||
        (!state&&((this.userName='Guest')&&this.route.navigate(['/login'])));
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
