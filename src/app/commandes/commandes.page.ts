import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../shared/services/commande.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
})
export class CommandesPage implements OnInit {

  id:any
  commandes :any[] = []

  searchTerm:any
  searchTermDate:any
  
  constructor(
    private commandeServ: CommandeService,
    private storage: StorageService
  ) { }

  ngOnInit() {
   this.storage.getData('id').then((data)=>{
     this.id = data
     this.commandeServ.commandeClient(this.id).subscribe(data=>{
      this.commandes = data.filter(commande => commande.etat == "en cours")
      //console.log(data)
    })
    })
     
  }

}
