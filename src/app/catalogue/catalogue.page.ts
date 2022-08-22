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

  slideOpts = {
    initialSlide: 1,
    speed: 100,
    loop:true,
    autoplay:{
      delay: 3000

    }
  };

  ngOnInit() {
    this.catalogueServ.all().subscribe(data => {
      this.catalogues = data.produits
     //console.log(data.produits)
    })
  }

  filterProduct(type:string){
    this.catalogueServ.all().subscribe(data => {
      if(type!=""){
      this.catalogues = data.produits?.filter(product => product.type === type)
      }
      else{
        this.catalogues = data.produits
      }
    })
  
  
}

}
