import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LivreurPageRoutingModule } from './livreur-routing.module';
import { LivreurPage } from './livreur.page';
import { LoaderComponent } from '../loader/loader.component';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { CommandeFilter } from '../shared/services/commande-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivreurPageRoutingModule,
    IonicHeaderParallaxModule,
  ],
  declarations: [
    LivreurPage,
    LoaderComponent,
    CommandeFilter,
  ]
})
export class LivreurPageModule {}
