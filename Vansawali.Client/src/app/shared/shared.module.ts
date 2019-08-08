import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialsModule} from './materials.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@NgModule({
  imports: [CommonModule,MaterialsModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  exports: [CommonModule,MaterialsModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  
})
export class SharedModule { }
