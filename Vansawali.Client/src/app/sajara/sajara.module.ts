import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SajaraPage } from './sajara.page';
//import { AutocompletePageModule } from '../shared/autocomplete/autocomplete.module';
import { AutocompletePage } from '../shared/autocomplete/autocomplete.page';


const routes: Routes = [
  {
    path: '',
    component: SajaraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //AutocompletePageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SajaraPage,AutocompletePage]
})
export class SajaraPageModule {}
