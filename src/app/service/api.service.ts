import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api_base_url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Call to .net API
   * @returns Str with all flights
   */
  public getAllFlights(): Observable<any>{
    return this.http.get<any>(`${this.api_base_url}/Journey/getAllFlights`);
  }

  public getFlightInformation(origin: string, destination: string, currencySelector: string): Observable<any>{
    return this.http.get<any>(`${this.api_base_url}/Journey/Get?origin=${origin}&destination=${destination}&Currience_selector=${currencySelector}&Authorization=bearer ${environment.apiKey}`);
  }

}
