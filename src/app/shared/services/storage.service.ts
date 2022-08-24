import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'token'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
  ) {
   
   }

  // async init(){
  //   console.log("test 1")
  //   await this.storage.create();
  //   console.log("test 2")
  // }

  getData(){
    return this.storage.get(STORAGE_KEY).then(data=>{
      console.log("promesse"+data)
    });
  }

   addData(item){
    //  const storedData = await this.storage.get(STORAGE_KEY) 
    //  storedData.push(item)
    //console.log("item "+item)
    return  this.storage.set('token', item)
  }

  async removeItem(index){
    const storedData = await this.storage.get(STORAGE_KEY)
    storedData.splice(index,1)
    return this.storage.set(STORAGE_KEY, storedData)
  }
}
