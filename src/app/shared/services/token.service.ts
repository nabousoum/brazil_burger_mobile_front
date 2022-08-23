import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  isLogged():boolean{
    const token = localStorage.getItem('token')
    console.log("help"+token)
    return !! token
  }
  
}
