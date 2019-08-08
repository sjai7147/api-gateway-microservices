import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './core/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy {
 
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Sajara',
      url: '/sajara',
      icon: 'sajara'
    },
    {
      title: 'Admin',
      url: '/admin',
      icon: 'admin'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route:Router,
    private authentication:AuthenticationService
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
          this.route.navigate(['/home']);
        }else{
          this.route.navigate(['/login']);
        }
      })
     });
  }
}
