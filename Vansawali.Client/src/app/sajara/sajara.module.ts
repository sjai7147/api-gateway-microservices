import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { IonicModule } from '@ionic/angular';

import { SajaraPage } from './sajara.page';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PersonService } from '../core/services/person.service';
import { VillageService } from '../core/services/village.service';


const routes: Routes = [
  {
    path: '',
    component: SajaraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,    
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers:[PersonService,VillageService],
  declarations: [SajaraPage]
})
export class SajaraPageModule {}
