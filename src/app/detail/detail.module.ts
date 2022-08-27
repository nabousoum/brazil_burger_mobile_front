import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { LoaderComponent } from '../loader/loader.component';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule,
    IonicHeaderParallaxModule,
  ],
  declarations: [
    DetailPage,
    LoaderComponent
  ]
})
export class DetailPageModule {}
