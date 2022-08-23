import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Catalogue } from '../models/catalogue';
import { environment } from 'src/environments/environment';
import { Detail } from '../models/detail';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  private url:string = `${apiUrl}/catalogues`
  private urlDetail:string = `${apiUrl}/details`


  constructor(
    private http:HttpClient
  ) { }

  /* catalogue */
  all():Observable<Catalogue> {
    return this.http.get<any>(this.url).pipe(
      map(data=>{
        let catalogues : Catalogue= {
          burgers: data['hydra:member'][0]['burgers'],
          menus:data['hydra:member'][1]['menus'],
        }
        data.produits=[...catalogues.menus,...catalogues.burgers]
        return data
      }),
    )
  }

  /* detail produit */
  produit(id:number):Observable<Detail> {
    return this.http.get<any>(`${this.urlDetail}/${id}`).pipe(
      map(data=>{
        return data
      }),
    )
  }
}
