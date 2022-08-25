import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandesPageRoutingModule } from './commandes-routing.module';

import { CommandesPage } from './commandes.page';
import { CommandeDateFilter, CommandeFilter } from '../shared/services/commande-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommandesPageRoutingModule
  ],
  declarations: [
    CommandesPage,
    CommandeFilter,
    CommandeDateFilter
  ]
})
export class CommandesPageModule {}
