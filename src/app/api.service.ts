import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://nestjs-8vfv.onrender.com/users';

  constructor(private http:HttpClient) { }

  getDataUsers():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  createUser(postData:any):Observable<any>{
    return this.http.post(this.apiUrl,postData);
  }


}
