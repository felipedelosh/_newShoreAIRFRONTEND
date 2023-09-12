import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit{

  //Information all flights
  public data_api_flights: string = " TRY TO CONECT WITH SERVER - NO CONECTION - NO GET DATA ";

  //HIDE HTML RESPONSE
  public edited: boolean = false; 
  txtMsg: string = "";
  txtTotalPrice: string = "";
  txtTotalFlights: string = "";

  //INPUT VALUES
  txtInputOrigin: string = "";
  txtInputDesination: string = "";
  txtInputCurrencySelector: string = "";
  txtCountFlights: string = "";
  txtSpecifyFlights: string = "";
  response_in_html = "<h1>ACA ESTOY</h1>";

  //Json Response
  private data: any = {};
  

  constructor(private apiService: ApiService){}

  ngOnInit(): void{
    this.getALLFlights();
  }

  getSpecifyFlight(){
    let _url: string = `/Journey/Get?origin=${this.txtInputOrigin}&destination=${this.txtInputDesination}&Currience_selector=${this.txtInputCurrencySelector}&Authorization=bearer ${environment.apiKey}`;
    this.apiService.getData(_url).subscribe(d => {
      if (d === null) this.data_api_flights = "NO SERVER CONECTION";
      if(d["status"] === "200"){
        this.edited = true;
        this.formatFlightResponse(d);
      }else{
        this.data_api_flights = "  ERROR  ";
        this.edited = false;
      }
    });
    
  }

  onInputOriginChange(event: any){
    this.txtInputOrigin = event.target.value;
  }

  onInputDestinationChange(event: any){
    this.txtInputDesination = event.target.value;
  }

  onInputCurrencySelector(event: any){
    this.txtInputCurrencySelector = event.target.value;
  }

  getALLFlights(){
    this.apiService.getData("/Journey/getFlightsV0").subscribe(d => {
      if (d === null) this.data_api_flights = "NO SERVER CONECTION";
      this.data_api_flights = this.formatApiFlights(d["data"]);
    });
  }

  formatApiFlights(data: string){
    let output: string = "";

    let arrFlights = JSON.parse(data);

    arrFlights.forEach(function(i: any) {
      output = output + "Vuelo Desde: " + i.DepartureStation + " hasta " + i.ArrivalStation + " Por tan Solo: $" + i.Price + "USD" +  " /*/ ";
    });

    return output;
  }

  formatFlightResponse(data: any){
    let jsonData = data["data"];
    let parseJsonData = JSON.parse(data["data"]);
    this.txtTotalPrice = parseJsonData["Price"];

    this.txtCountFlights = parseJsonData["Flights"].length;
    
    let output: string = "";
    let counter = 1;
    parseJsonData["Flights"].forEach(function(i: any) {
      output += "Vuelo: " + counter + " > " + i.Origin + ":" + i.Destination + "///";
      counter += 1;
    });
    this.txtSpecifyFlights = output;
    this.txtMsg = parseJsonData["Message"];
  }
}
