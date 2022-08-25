import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ICredential } from '../shared/models/Icredentials';
import { AuthServService } from '../shared/services/auth-serv.service';
import { StorageService } from '../shared/services/storage.service';

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

  constructor(
    private authServ : AuthServService,
    private router : Router,
    public toastController: ToastController,
    private storage: StorageService,
  ) { }

  ngOnInit() {
  
  }

  onSubmit(){
    this.authServ.login(this.form).subscribe(
      data=>{
        this.storage.addData(data.token,data.id).then(()=>{
          window.location.reload();
        });
        this.storage.bool.next(true);
        this.router.navigateByUrl('/catalogue');

        console.log("get data "+ this.storage.getData('token'))
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
