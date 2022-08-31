import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../shared/services/cart-service.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  items:any = []
  montant:any
  
  constructor(
    private cartServ:CartServiceService,
  ) { }

  ngOnInit() {
    this.cartServ.newCart.subscribe(data=>{  
      if(data.burgerCommandes && data.menuCommandes)
      this.items = [...data.burgerCommandes,...data.menuCommandes,...data.boissonCommandes,...data.friteCommandes]
      this.montant = this.cartServ.getTotalPrice() 
    })
  }

}
