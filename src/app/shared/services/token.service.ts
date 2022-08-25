import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  data:any
  token:any
  constructor(
    private storage : StorageService,
    private router: Router
  ) { }

  async saveToken(token: string,id:string) {
    let tok = await this.storage.getData('token')
      this.storage.addData(token,id).then(()=>{
        window.location.reload();
      } );
      // var tokenI:string  = tok;
      // var decoded: any = jwt_decode(tokenI);
      // console.log("role "+decoded.roles[0]);
 }
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
