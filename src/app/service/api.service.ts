import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api_base_url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getData(_url_args: string): Observable<any>{
    return this.http.get<any>(this.api_base_url+_url_args);
  }

}
