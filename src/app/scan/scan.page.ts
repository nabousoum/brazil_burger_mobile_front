import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

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

}
