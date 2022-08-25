import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from 'src/app/shared/services/commande.service';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.page.html',
  styleUrls: ['./detail-commande.page.scss'],
})
export class DetailCommandePage implements OnInit {

  commandes:any=null
  private id :any = 0;

  constructor(
    private comServ:CommandeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
     this.comServ.detailCommande(this.id).subscribe(data=>{
      console.log("id "+this.id)
      console.log("detail "+data);
      this.commandes = data
     })
  }

}
