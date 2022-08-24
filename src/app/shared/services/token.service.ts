import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private storage : StorageService
  ) { }

  // isLogged():boolean{
  //   const token = localStorage.getItem('token')
  //   console.log("help"+token)
  //   return !! token
  // }
  isLogged(token):boolean{
    return !! false
  }
}
