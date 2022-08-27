import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  private urlLivraison:string = `${apiUrl}/livraisons`

  constructor(
    private http:HttpClient
  ) { }
  /* livraisons d un livreur */
  livraisonByLivreur(token:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<any>(this.urlLivraison,httpOptions)
    .pipe(
      map(data=>{
        let test = data['hydra:member']
        data = test
        return data
      }
      ))
  }

}
