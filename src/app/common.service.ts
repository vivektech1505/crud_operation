import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  readonly url = "http://localhost:3000/"

  constructor(private http: HttpClient) { }
    AddUpdateUser(user:any, id : any) : Observable<any>{
      //debugger
      if(id  ) {
        return this.http.put(this.url+'users/'+id, user)
      
      }
      else{
        return this.http.post(this.url+'users',user)
      }
  }

  getAllUsers() : Observable<any>{
    //debugger
    return this.http.get(this.url+'users')
  
}

deleteUserById(id:any) : Observable<any>{
  return this.http.delete(this.url+'users/'+id)
}

editUserById(id:any) : Observable<any>{
  return this.http.get(this.url+'users/'+id)
  
}

}
