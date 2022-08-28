import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivreurPage } from './livreur.page';

const routes: Routes = [
  {
    path: '',
    component: LivreurPage
  },
  {
    path: 'qr-code/:id',
    loadChildren: () => import('./qr-code/qr-code.module').then( m => m.QrCodePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivreurPageRoutingModule {}
