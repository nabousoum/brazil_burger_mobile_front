import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/services/token.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './shared/services/storage.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(
    private router: Router,
    private tokenService: TokenService,
    private storage: StorageService,
    private stor: Storage
  ) {
   
  }

  
  isLogged:boolean
  role:string
  token = this.storage.getData('token').then((data)=>{
      if(data == null){
        this.isLogged = false
      }
      else {
        this.isLogged = true
      }
      console.log(this.isLogged);
  })
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
  
 
   async logout(){
    await this.stor.clear()
    this.router.navigate(['/catalogue'])
    location.reload()
  }
}
