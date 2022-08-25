import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandesPage } from './commandes.page';

const routes: Routes = [
  {
    path: '',
    component: CommandesPage
  },
  {
    path: 'detail-commande/:id',
    loadChildren: () => import('./detail-commande/detail-commande.module').then( m => m.DetailCommandePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandesPageRoutingModule {}
