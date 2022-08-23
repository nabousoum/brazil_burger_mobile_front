import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICredential, IToken } from '../models/Icredentials';

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class AuthServService {

  url = `${apiUrl}/login_check`

  constructor(
    private http:HttpClient,
  ) { }

  /* function login */
  login(credentials:ICredential):Observable<IToken>{
    return this.http.post<any>(this.url, credentials)
    .pipe(map(user => {
      localStorage.setItem('token', JSON.stringify(user));
      return user;
    }));
  }
}
