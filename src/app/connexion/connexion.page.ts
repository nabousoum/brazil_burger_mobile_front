import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ICredential } from '../shared/models/Icredentials';
import { AuthServService } from '../shared/services/auth-serv.service';
import { StorageService } from '../shared/services/storage.service';
import jwt_decode from "jwt-decode";
import { TokenService } from '../shared/services/token.service';
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
    public toastController: ToastController,
    private storage: StorageService,
    private tokenServ : TokenService
  ) { }

  ngOnInit() {
  
  }

    onSubmit(){
  
      this.authServ.login(this.form).subscribe(
      data=>{
        // this.storage.addData(data.token,data.id).then(()=>{
        //   window.location.reload();
        // });
        // this.storage.bool.next(true);
        //   this.router.navigateByUrl('/catalogue');
        // console.log("get data "+ this.storage.getData('token'))
        this.tokenServ.saveToken(data.token,data.id)
        //  this.storage.getData('token').then(data=>{
          var tokenI:string  = data.token;
          var decoded: any = jwt_decode(tokenI);
          console.log(decoded.roles[0]);
           if(decoded.roles[0] == ["ROLE_CLIENT"] ){
              this.router.navigate(['/catalogue'])
          }
          else{
            this.router.navigate(['/livreur'])
          }
       
        // })
          
      },
      err=>{
        console.log(err)
        this.storage.bool.next(true);
      },
    )
  }

  /* toast */
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Connexion reussie',
      duration: 2000,
      color:"success"
    });
    toast.present();
  }

}
