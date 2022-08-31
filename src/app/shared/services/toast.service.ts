import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController,
  ) { }
      /* toast */
      async presentToast(message,col) {
        const toast = await this.toastController.create({
          message: message,
          duration: 2000,
          color:col
        });
        toast.present();
      }
}
