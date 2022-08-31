import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Result } from '@zxing/library';
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

  constructor(
    private qrScanner: QRScanner,
    
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

  handleQrCodeResult(resultString: string) {
    console.log('Result: ', resultString);
    this.qrResultString = resultString;
  }

}
