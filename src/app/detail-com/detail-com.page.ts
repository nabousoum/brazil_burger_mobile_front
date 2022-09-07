import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from '../shared/services/commande.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-detail-com',
  templateUrl: './detail-com.page.html',
  styleUrls: ['./detail-com.page.scss'],
})
export class DetailComPage implements OnInit {

  commande:any=null
  montant:any
  private id :any = 0;
  token:any

  constructor(
    private comServ:CommandeService,
    private route: ActivatedRoute,
    private storage:StorageService
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    let token =  await this.storage.getData('token')
     this.comServ.detailCommande(this.id,token).subscribe(data=>{
      console.log("id "+this.id)
      console.log("detail "+data.numeroCommande);
      this.montant = data.montantCommande
      this.commande = [...data.burgerCommandes,...data.menuCommandes,...data.boissonCommandes,...data.friteCommandes]
     })
  }
}
