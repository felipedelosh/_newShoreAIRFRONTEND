import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit{

  //Information abouts services, api conection and flights
  public data_api_flights: string = " TRY TO CONECT WITH SERVER - NO CONECTION - NO GET DATA ";

  //HIDE HTML RESPONSE
  public isDisplayed: boolean = false; 
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
    this.apiService.getFlightInformation(this.txtInputOrigin, this.txtInputDesination, this.txtInputCurrencySelector, ).subscribe(d => {
      if (d === null) this.data_api_flights = "* ERROR TO GET FLIGHT *";
      //Server response
      if(d["status"] === "200"){
        this.formatFlightResponse(d);
        this.showDivFlightDisplayInformation();
      }else{
        this.data_api_flights = "  ERROR  ";
        this.hideDivFlightDisplayInformation();
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

  hideDivFlightDisplayInformation(){
    this.isDisplayed = false;
  }

  showDivFlightDisplayInformation(){
    this.isDisplayed = true;
  }

  getALLFlights(){
    this.apiService.getAllFlights().subscribe(d => {
      if (d === null) this.data_api_flights = "- WARNING - NO SERVER CONECTION - ";
      this.data_api_flights = d["data"];
    });
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
