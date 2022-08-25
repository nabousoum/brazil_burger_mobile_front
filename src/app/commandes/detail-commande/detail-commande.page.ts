import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from 'src/app/shared/services/commande.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.page.html',
  styleUrls: ['./detail-commande.page.scss'],
})
export class DetailCommandePage implements OnInit {

  commandes:any=null
  private id :any = 0;
  token:any

  constructor(
    private comServ:CommandeService,
    private route: ActivatedRoute,
    private storage:StorageService
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    await this.storage.getData('token').then((data)=>{
      this.token = data})
     this.comServ.detailCommande(this.id,this.token).subscribe(data=>{
      console.log("id "+this.id)
      console.log("detail "+data);
      this.commandes = data
     })
  }

}
