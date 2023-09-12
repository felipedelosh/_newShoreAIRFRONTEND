import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit{

  private data: any = {};
  public data_api_flights: string = "";

  constructor(private apiService: ApiService){}

  ngOnInit(): void{
    this.getALLFlights();
  }

  getSpecifyFlight(){
    alert("Aca estoy");
  }

  getALLFlights(){
    this.apiService.getData("/Journey/getFlightsV0").subscribe(d => {
      this.data_api_flights = this.formatApiFlights(d["data"]);
    });
  }

  formatApiFlights(data: string){
    let output = "";

    let arrFlights = JSON.parse(data);

    arrFlights.forEach(function(i: any) {
      output = output + "Vuelo Desde: " + i.DepartureStation + " hasta " + i.ArrivalStation + " Por tan Solo: $" + i.Price + "USD" +  " /*/ ";
      console.log(i);
    });

    return output;
  }

}
