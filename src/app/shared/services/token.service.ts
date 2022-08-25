import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  data:any
  constructor(
    private storage : StorageService
  ) { }

  // isLogged():boolean{
  //   const token = localStorage.getItem('token')
  //   console.log("help"+token)
  //   return !! token
  // }
  isLogged():boolean{
    let test:boolean
    this.storage.getData('token') .then(
      (result) => {
        this.data = result
       console.log("result "+result)
       return result
      }
      )
    console.log(" is logged "+this.data)
    return test
  }
}
