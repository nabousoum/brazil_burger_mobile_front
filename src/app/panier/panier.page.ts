import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Detail } from '../shared/models/detail';
import { BurgerCommande, MenuCommande } from '../shared/models/panier';
import { CartServiceService } from '../shared/services/cart-service.service';
import { CommandeService } from '../shared/services/commande.service';
import { StorageService } from '../shared/services/storage.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  items:any = []
  montant:any
  token:any

  constructor(
    private cartServ:CartServiceService,
    private comServ:CommandeService,
    private storage: StorageService,
    private router:Router,
    private toast: ToastService,
  ) { }

  ngOnInit() {
    this.cartServ.newCart.subscribe(data=>{  
      if(data.burgerCommandes && data.menuCommandes)
      this.items = [...data.burgerCommandes,...data.menuCommandes,...data.boissonCommandes,...data.friteCommandes]
      this.montant = this.cartServ.getTotalPrice() 
    })
  }

    /* fonction de validation de commande */
   async validerCommande(){
    await this.storage.getData('token').then((data)=>{
      this.token = data})
      console.log("token com "+this.token)
      if(this.token != null){
        alert("hello")
        let zone={ id:1}
        this.cartServ.newCart.value.zone = zone
        console.log( "test commande"+this.cartServ.newCart.value)
        this.comServ.saveCommande(this.cartServ.newCart.value,this.token).subscribe(
          err=> console.log(err),
          )
        //this.cartServ.removeAllCart()
        this.toast.presentToast("votre commande a bien été enregistrée","success")
      }
      else{
        this.router.navigate(['/connexion'])
      }
    }

    /* supprimer un element du panier */
    onDelete(event : any){
       this.cartServ.removeCart(event)
       this.toast.presentToast("produit supprimé du panier","warning")
     }

    /* changer quantite dans le panier */
     changeQteInCart(detail:Detail,type:any){
      if(type == 'plus'){
        if(detail.burger){
          let burger:BurgerCommande = {
            quantite:1,
            burger:detail.burger
          }
          this.cartServ.addBurger(burger)
        }
        if (detail.menu){ 
          let menu:MenuCommande = {
            quantite:1,
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
      }
      if(type == 'moins'){
        if(detail.burger){
          let burger:BurgerCommande = {
            quantite:-1,
            burger:detail.burger
          }
          this.cartServ.addBurger(burger)
        }
        if (detail.menu){ 
          let menu:MenuCommande = {
            quantite:-1,
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
      }
     
  }

  /* modal */
  



}
