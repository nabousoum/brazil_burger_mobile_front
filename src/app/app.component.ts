import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/services/token.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './shared/services/storage.service';

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
  // bool = this.storage.getBool().subscribe(
  //   data=>{
  //     this.isLogged = data;
  //     console.log("boolean "+data);
  //   }
  // )
  token = this.storage.getData('token').then((data)=>{
    if(data == null){
      this.isLogged = false
     }
     else{
      this.isLogged = true
     }
    console.log(this.isLogged);
  })
   //isLogged:boolean = this.tokenService.isLogged()
   

   async logout(){
    await this.stor.clear()
    this.router.navigate(['/catalogue'])
    location.reload()
  }
}
