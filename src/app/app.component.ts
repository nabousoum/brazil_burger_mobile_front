import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/services/token.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './shared/services/storage.service';
import jwt_decode from "jwt-decode";
import { CartServiceService } from './shared/services/cart-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  itemIncCart:number = 0
  countPanier:number = 0
  isLogged:boolean
  role:string

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private storage: StorageService,
    private stor: Storage,
    private cartService:CartServiceService,
  ) {}


  /*fonction pour test if connected*/
  token = this.storage.getData('token').then((data)=>{
      if(data == null){
        this.isLogged = false
      }
      else {
        this.isLogged = true
      }
      console.log(this.isLogged);
  })
  /* fonction pour roles */
  token2 = this.storage.getData('token').then((data) => {
      var tokenI:string  = data;
      var decoded: any = jwt_decode(tokenI);
      if(decoded.roles[0] == ["ROLE_CLIENT"] ){
          this.role = "client"
      }
       if(decoded.roles[0] == ["ROLE_LIVREUR"]){
        this.role = "livreur"
      }
  })
  
  /* fonction deconnexion */
   async logout(){
    await this.stor.clear()
    this.router.navigate(['/catalogue'])
    location.reload()
  }

  /* cart */
  cart = this.cartService.newCart.subscribe(d=>{
    if( d.burgerCommandes && d.menuCommandes){
      this.countPanier = d.burgerCommandes.length + d.menuCommandes.length
    }
    this.itemIncCart = this.countPanier
  })

}
