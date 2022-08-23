import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produit } from '../shared/models/produit';
import { CatalogueService } from '../shared/services/catalogue.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss'],
})
export class CataloguePage implements OnInit {
  /* declrations */
  pathImage = environment.pathImage
  catalogues: any[]|undefined = undefined;

  constructor(
    private catalogueServ:CatalogueService,
    private loadingCtrl: LoadingController
  ) { }

  /* slides */
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
    })
  }

  /* filtres */
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

  /* loader */
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 1000,
      cssClass: 'custom-loading',
    });

    loading.present();
  }

}
