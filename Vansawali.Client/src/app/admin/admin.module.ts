import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import {HttpClientModule} from '@angular/common/http'
import { IonicModule } from '@ionic/angular';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { VillageService } from '../core/services/village.service';
import {VillageComponent} from './village/village.component';

import { PersonAddEditComponent } from './person-add-edit/person-add-edit.component';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PersonService } from '../core/services/person.service';


const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent
  },
  {
    path: 'village',
    component: VillageComponent
  },
  {
    path: 'person',
    component: PersonAddEditComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,

     MatAutocompleteModule,
  
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[VillageService,PersonService],
  declarations: [VillageComponent,PersonAddEditComponent,AdminHomeComponent]
})
export class AdminModule { }
