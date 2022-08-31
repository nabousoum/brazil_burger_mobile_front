import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Result } from '@zxing/library';
import { CommandeService } from '../shared/services/commande.service';
import { StorageService } from '../shared/services/storage.service';
import { ToastService } from '../shared/services/toast.service';
@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  showCamera = false;
  textScanned: string = '';
  //qrResult: Result;
  qrResultString: string;
  token:any
  id:any

  constructor(
    private qrScanner: QRScanner,
    private comServ: CommandeService,
    private storage: StorageService,
    private toast : ToastService
  ) {
    this.scancode();
   }

  ngOnInit() {
  }

  /* fonction scan code */
  scancode() {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
       if (status.authorized) {
    
         let scanSub = this.qrScanner.scan().subscribe((text: string) => {
           console.log('Scanned something', text);
  
           this.qrScanner.hide(); // hide camera preview
           scanSub.unsubscribe(); // stop scanning
         });
  
       } else if (status.denied) {

       } else {

       }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  /* test success scan */

 async handleQrCodeResult(resultString: any) {
    resultString = JSON.parse(resultString);
    let idCom = resultString.idCommande
    let idClient = resultString.idClient
    alert(idCom)
    console.log('Result: ', resultString);
    await this.storage.getData('id').then((data)=>{
      this.id = data})
    if(idClient == this.id){
      await this.storage.getData('token').then((data)=>{
        this.token = data})
        this.comServ.validerCommande(idCom,this.token).subscribe(
          err=>{
            console.log(err);
          }
        )
        this.toast.presentToast("commande validée","success")
    }
    this.qrResultString = resultString;
  }

}
