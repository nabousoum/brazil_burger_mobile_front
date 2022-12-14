import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produit } from '../shared/models/produit';
import { CatalogueService } from '../shared/services/catalogue.service';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.scss'],
})
export class CataloguePage implements OnInit {
  /* declarations */
  valuePrix: number = 0;
  pathImage = environment.pathImage
  catalogues: any[]|undefined = undefined;

  constructor(
    private catalogueServ:CatalogueService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) { }

  /* slides */
  slideOpts = {
    initialSlide: 1,
    speed: 100,
    loop:true,
    parallax: true,
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
        if(type=="burger" || type=="menu") {
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

  /* alert range */
  async presentAlert() {
    const alert = await this.alertController.create({
      message:`choisissez un prix entre 1000 et 20000 ${this.valuePrix}` ,
      inputs: [
      {   
        name: 'prix',
        type: 'range',
        min: 1000,
        max: 20000,
        step:1000,      
      }
    ],    
      buttons: [
          {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                  console.log('Confirm Cancel');
              }
          }, 
          {
              text: 'Ok',
              handler: (alertData) => { 
                  console.log(alertData.prix);
                  this.valuePrix = alertData.prix;
                  this.catalogueServ.all().subscribe(data => {
                    this.catalogues = data.produits?.filter(product => product.prix >= this.valuePrix)
                  })
              }
          }
      ]
  });
  await alert.present();
  }

}
