import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICredential, IToken } from '../models/Icredentials';
import { StorageService } from './storage.service';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class AuthServService {

  url = `${apiUrl}/login_check`

  constructor(
    private http:HttpClient,
    private storage:StorageService
  ) { }

  /* function login */
  login(credentials:ICredential):Observable<IToken>{
    return this.http.post<any>(this.url, credentials)
    // .pipe(map(user => {
    //   console.log("user "+user.token)
    //   localStorage.setItem('token', JSON.stringify(user));
    //   this.storage.addData(user.token)
    //   console.log("getData "+this.storage.getData())
    //   return user;
    // }));
   
  }
}
