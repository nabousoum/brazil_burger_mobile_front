import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';


const apiUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  data:any
  private urlCommande:string = `${apiUrl}/commandes`

  constructor(
    private http:HttpClient,
    private storage: StorageService
  ) { }
  commandeClient(){
    this.storage.getData('token').then(
      (result) => {
        this.data = result
       console.log("result commande"+this.data)
       return this.data
        }
      )
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.data}`
      })
    };
    return this.http.get<any>(this.urlCommande,httpOptions)
    .pipe(
      map(data=>{
        let test = data['hydra:member']
        data = test
        return data
      }
      )
    )
  }
}
