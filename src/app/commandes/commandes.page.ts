import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../shared/services/commande.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
})
export class CommandesPage implements OnInit {

  commandes :any[] = []
  constructor(
    private commandeServ: CommandeService
  ) { }

  ngOnInit() {
      this.commandeServ.commandeClient().subscribe(data=>{
        console.log(data)
      })
  }

}
