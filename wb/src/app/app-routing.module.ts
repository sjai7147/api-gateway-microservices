import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Core/Guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate:[AuthGuard],   
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    canActivate:[AuthGuard],   
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './registration/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './registration/register/register.module#RegisterPageModule' },
  { path: 'forgotpass', loadChildren: './registration/forgotpass/forgotpass.module#ForgotpassPageModule' },
  { path: 'changepass', canActivate:[AuthGuard], loadChildren: './registration/changepass/changepass.module#ChangepassPageModule' },
  { path: 'person', loadChildren: './person/person.module#PersonPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
