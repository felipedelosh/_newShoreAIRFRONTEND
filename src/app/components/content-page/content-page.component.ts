import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Flight } from '../../interfaces/flight.interface';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})


export class ContentPageComponent implements OnInit{
  //Save all flights in response
  flights: Flight[] = [];
  x: any[] = [1,2,3,4];

  //Information abouts services, api conection and flights
  public data_api_flights: string = " TRY TO CONECT WITH SERVER - NO CONECTION - NO GET DATA ";

  //HIDE HTML RESPONSE
  public isDisplayed: boolean = false; // Show hide a DIV to response API 
  txtMsg: string = ""; // The API comment to show final user
  txtTotalPrice: string = ""; 
  txtTotalFlights: string = "";

  //INPUT VALUES
  txtInputOrigin: string = "";
  txtInputDesination: string = "";
  txtInputCurrencySelector: string = "";
  txtCountFlights: string = "";
  txtSpecifyFlights: string = "";

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
    //Reset previus response
    this.flights = [];

    let parseJsonData = JSON.parse(data["data"]);
    this.txtTotalPrice = parseJsonData["Price"];
    this.txtCountFlights = parseJsonData["Flights"].length;
    let output: string = "";
    parseJsonData["Flights"].forEach((i: any) => {
      const tempFlight: Flight = {
        origin: i.Origin,
        destination: i.Destination,
        price: i.Price
      };
      this.flights.push(tempFlight);
    });

    this.txtSpecifyFlights = output;
    this.txtMsg = parseJsonData["Message"];
  }
}
