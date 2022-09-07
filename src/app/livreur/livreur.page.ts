import { Component, OnInit } from '@angular/core';
import { LivraisonService } from '../shared/services/livraison.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.page.html',
  styleUrls: ['./livreur.page.scss'],
})
export class LivreurPage implements OnInit {

  id:any
  token:any
  livraisons:any[] = []
  searchTerm = "en cours"

  constructor(
    private storage : StorageService,
    private livraisonServ:LivraisonService
  ) { }

  async ngOnInit() {
    await this.storage.getData('id').then((data)=>{
      this.id = data})
    await this.storage.getData('token').then((data)=>{
      this.token = data})
    this.livraisonServ.livraisonByLivreur(this.token).subscribe(
      data=>{
        this.livraisons = data.filter(livraison=>livraison.livreur.id === this.id)
      }
    )
    
  }
  /* slides */
  slideOpts = {
    initialSlide: 1,
    speed: 100,
    loop:true,
    parallax: true,
    autoplay:{
      delay: 3000

    }
  };

    /* filtre segment */
    segmentChanged(ev: any) {
      console.log('Segment changed', ev);
    } 
}
