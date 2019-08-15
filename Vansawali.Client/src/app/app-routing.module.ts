import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',    
    loadChildren: './home/home.module#HomePageModule'
  }, 
  { 
    path: 'login', 
    loadChildren: './login/login.module#LoginPageModule' 
  },
  { 
    path: 'sajara', 
    loadChildren: './sajara/sajara.module#SajaraPageModule' 
  },
  { 
    path: 'admin', 
    canActivate:[AuthGuard],   
    loadChildren: './admin/admin.module#AdminModule' 
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
