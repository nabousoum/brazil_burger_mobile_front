import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ICredential } from '../shared/models/Icredentials';
import { AuthServService } from '../shared/services/auth-serv.service';

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
    public toastController: ToastController
  ) { }

  ngOnInit() {
  
  }

  onSubmit(){
    this.authServ.login(this.form).subscribe(
      data=>{
          console.log(data)
          this.router.navigate(['/catalogue'])
          window.location.reload()
      },
      err=>{
        console.log(err)
      },
    )
  }

  /* toast */
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Connexion reussie',
      duration: 2000
    });
    toast.present();
  }


}
