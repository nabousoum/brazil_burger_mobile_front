import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from 'src/app/shared/services/commande.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  dataQrCode:string
  id:any
  token:any
  showCamera = false;
  textScanned: string = '';

  constructor(
    private comServ:CommandeService,
    private route: ActivatedRoute,
    private storage:StorageService
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    let token =  await this.storage.getData('token')
     this.comServ.detailCommande(this.id,token).subscribe(data=>{
      this.dataQrCode = JSON.stringify(
        {
          "idCommande" : data.id,
          "idClient" : data.client.id
        }
      )
     })
  }

}
