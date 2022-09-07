import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ICredential } from '../shared/models/Icredentials';
import { AuthServService } from '../shared/services/auth-serv.service';
import { StorageService } from '../shared/services/storage.service';
import jwt_decode from "jwt-decode";
import { TokenService } from '../shared/services/token.service';
import { ToastService } from '../shared/services/toast.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  form:ICredential={
    login:'',
    password:''
  }
  token:any
  constructor(
    private authServ : AuthServService,
    private router : Router,
    private toast : ToastService,
    private storage: StorageService,
    private tokenServ : TokenService
  ) { }

  ngOnInit() {
  
  }

    onSubmit(){
  
      this.authServ.login(this.form).subscribe(
      data=>{
        this.tokenServ.saveToken(data.token,data.id)
          var tokenI:string  = data.token;
          var decoded: any = jwt_decode(tokenI);
          console.log(decoded.roles[0]);
           if(decoded.roles[0] == ["ROLE_CLIENT"] ){
              this.router.navigate(['/catalogue'])
          }
          else{
            this.router.navigate(['/livreur'])
          }
          this.toast.presentToast("connexion reussie","success")
      },
      err=>{
        console.log(err)
        this.storage.bool.next(true);
      },
    )
  }


}
