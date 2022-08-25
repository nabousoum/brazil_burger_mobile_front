import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailComPageRoutingModule } from './detail-com-routing.module';

import { DetailComPage } from './detail-com.page';
import { LoaderComponent } from '../loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailComPageRoutingModule
  ],
  declarations: [
    DetailComPage,
    LoaderComponent
  ]
})
export class DetailComPageModule {}
