import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComPage } from './detail-com.page';

const routes: Routes = [
  {
    path: '',
    component: DetailComPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailComPageRoutingModule {}
