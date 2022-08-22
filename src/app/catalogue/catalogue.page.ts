import { Component, OnInit } from '@angular/core';
import { Produit } from '../shared/models/produit';
import { CatalogueService } from '../shared/services/catalogue.service';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss'],
})
export class CataloguePage implements OnInit {
  catalogues: any[] = [];

  constructor(
    private catalogueServ:CatalogueService
  ) { }

  ngOnInit() {
    this.catalogueServ.all().subscribe(data => {
      this.catalogues = data.produits
     //console.log(data.produits)
    })
  }

}
