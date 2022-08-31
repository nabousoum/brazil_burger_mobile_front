import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BurgerCommande, MenuCommande, Panier } from '../models/panier';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class CartServiceService implements OnInit{
  private panier : Panier = {
    burgerCommandes: [],
    menuCommandes: [],
    boissonCommandes: [],
    friteCommandes: []
  }
  newCart = new BehaviorSubject<Panier>(this.panier)
  test:any
  constructor(private storage :StorageService,  private stor: Storage,) {
    const ls =  this.storage.getData('cart').then(data=>{
      if(data){
        this.newCart.next(data)
      }
     
    })
   }

   ngOnInit(): void {
    // const ls =  this.storage.getData('cart').then(data=>{
    //   if(ls){
    //     this.newCart.next(data)
    //   }
     
    // })
   }

  /* add burger commande */
  addBurger(burger:BurgerCommande){
    var trouve=false
    this.newCart.value.burgerCommandes?.map(burgerCommande=>{
      if(burgerCommande.burger?.id == burger.burger?.id){
          trouve = true
          Number(burgerCommande.quantite += burger.quantite)
      }
    })
    if (!trouve){
      let newData = {
          ...this.newCart.value,
          burgerCommandes: this.newCart.value.burgerCommandes?.concat(burger)
      }
       this.storage.saveData('cart',newData)
        return this.newCart.next(newData)
    }
    else{

      let newData = {
          ...this.newCart.value,
          burgerCommandes: this.newCart.value.burgerCommandes
      }
      this.storage.saveData('cart',newData)
         this.newCart.next(newData)
    }
    
  }

   /* add menu commande */
   addMenu(menuCommande:MenuCommande) {
    var trouve=false
    this.newCart.value.menuCommandes?.map(menuCom=>{
      if(menuCom.menu?.id == menuCommande.menu?.id){
          trouve = true
          Number(menuCom.quantite += menuCommande.quantite)
      }
    })
    if(!trouve){
      let newData = {
        ...this.newCart.value,
        menuCommandes: this.newCart.value.menuCommandes?.concat(menuCommande)
      }
      this.storage.saveData('cart',newData)
      return this.newCart.next(newData)
    }
    else{
       const ls = JSON.parse(localStorage.getItem('cart') || 'null')
       let newData = {
        ...this.newCart.value,
        menuCommandes: this.newCart.value.menuCommandes
      }
      this.storage.saveData('cart',newData)
      return this.newCart.next(newData)
    }
    
  }

   /* montant total panier */
   getTotalPrice(){
    let grandTotal = 0
    this.newCart.value.menuCommandes?.map(menuCom=>{
      if(menuCom?.menu?.prix)
      grandTotal += Number( menuCom?.menu?.prix * menuCom.quantite)
    })
    this.newCart.value.burgerCommandes?.map(burgerCommande=>{
      if(burgerCommande.burger?.prix)
      grandTotal += Number( burgerCommande?.burger?.prix * burgerCommande.quantite)
    })
    return grandTotal
  }

  /* supprimer ts les elements du panier */
  async removeAllCart(){
    await this.stor.remove('cart');
    window.location.reload()
  }

    /* suppression d un element du panier */
    removeCart(object:any){
      /* menu */
      if(object.type == 'menu'){
        this.newCart.value.menuCommandes?.map((menuCom,index)=>{
          if(menuCom.menu?.id == object.id){
            this.newCart.value.menuCommandes?.splice(index,1)
        }
        })
        let newData = {
          ...this.newCart.value,
          menuCommandes: this.newCart.value.menuCommandes
        }
        this.storage.saveData('cart',newData)
        return this.newCart.next(newData)
      }
      /* burger */
      if(object.type == 'burger'){
        this.newCart.value.burgerCommandes?.map((burgerCom,index)=>{
          if(burgerCom.burger?.id == object.id){
            this.newCart.value.burgerCommandes?.splice(index,1)
        }
        })
  
        let newData = {
            ...this.newCart.value,
            burgerCommandes: this.newCart.value.burgerCommandes
        }
        this.storage.saveData('cart',newData)
           this.newCart.next(newData)
      }
    
      return this.newCart.next
    }

}
