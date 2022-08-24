import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private urlCommande:string = `${apiUrl}/commandes`

  constructor(
    private http:HttpClient
  ) { }
  // commandeClient(){
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': `Bearer ${this.token.getToken()}`
  //     })
  //   };
  //   return this.http.get<any>(this.urlCommande,httpOptions)
  //   .pipe(
  //     map(data=>{
  //       let test = data['hydra:member']
  //       data = test
  //       return data
  //     }
  //     )
  //   )
  // }
}
