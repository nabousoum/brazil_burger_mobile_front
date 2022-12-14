import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Detail } from '../shared/models/detail';
import { CatalogueService } from '../shared/services/catalogue.service';
import { Observable } from 'rxjs';
import { BurgerCommande, MenuCommande } from '../shared/models/panier';
import { CartServiceService } from '../shared/services/cart-service.service';
import { ToastService } from '../shared/services/toast.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  produit  : Observable<Detail> | null = null;
  private id :any = 0;
  private type:any =""
  qte:number = 1

  constructor(
    private catalogueServ:CatalogueService,
    private route: ActivatedRoute,
    private cartServ: CartServiceService,
    private toast : ToastService

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.paramMap.get('type');
    this.produit = this.catalogueServ.produit(this.id);
      
  }
  /* */
  dec() { this.resize(-1); }
  inc() { this.resize(+1); }

  resize(delta: number) {
    this.qte = Math.min(40, Math.max(1, +this.qte + delta));
  
  }

  getPrixMenu(data:any){
    let prix = data.menu.prix * (this.qte)
    return prix
  }
  getPrixBurger(data:any){
    let prix = data.burger.prix * (this.qte)
    return prix
  }


  /* add to cart */
  addToCart(detail:Detail){
      if(detail.burger){
        let burger:BurgerCommande = {
          quantite:this.qte,
          burger:detail.burger
        }
        this.cartServ.addBurger(burger)
        console.log(this.cartServ.newCart.value)
      }
      if (detail.menu){ 
        let menu:MenuCommande = {
          quantite:this.qte,
          menu:{
            id:Number(detail.menu.id),
            nom: detail.menu.nom,
            image:detail.menu.image,
            type:detail.menu.type,
            prix:detail.menu.prix,
            commandeMenuBoissonTailles: []
          }
        }
        this.cartServ.addMenu(menu)
        
      }
      this.toast.presentToast("votre  produit a bien ??t?? ajout?? dans le panier","success")
  }


}

