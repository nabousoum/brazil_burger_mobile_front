import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from '../shared/services/commande.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.page.html',
  styleUrls: ['./commandes.page.scss'],
})
export class CommandesPage implements OnInit {

  id:any
  token :any
  commandes :any[] = []

  searchTerm:any
  searchTermDate:any
  
  constructor(
    private commandeServ: CommandeService,
    private storage: StorageService,
    private router: Router
  ) { }

 async ngOnInit() {
   await this.storage.getData('id').then((data)=>{
     this.id = data})
     await this.storage.getData('token').then((data)=>{
      this.token = data})
    this.commandeServ.commandeClient(this.id,this.token).subscribe(data=>{
      this.commandes = data
      //.filter(commande=>commande.etat === "en cours")
    })
     
  }
  navigateTo(url) {
    this.router.navigateByUrl(url)
  }
  async CommandetoEdit(id:any){
    await this.storage.getData('token').then((data)=>{
    this.token = data})
    this.commandeServ.resetCommande(id,this.token) .subscribe();
    location.reload()
    this.router.navigate(['/commandes'])
  }
  
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  } 
}
