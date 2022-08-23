import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Detail } from '../shared/models/detail';
import { CatalogueService } from '../shared/services/catalogue.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  produit  : Observable<Detail> | null = null;
  private id :any = 0;
  private type:any =""

  constructor(
    private catalogueServ:CatalogueService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.paramMap.get('type');
    this.produit = this.catalogueServ.produit(this.id);
      
    }
  }

