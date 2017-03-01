import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { Http } from '@angular/http'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  latitude : string;
  longitude: string;
  locationString: string;
  searchUrl : string;
  resultsJson : any;
  resultsArray : any;
  today: string;
  year: Date;
  month: string;
  day: string;
  currentDate: Date;
  formattedDate: string;


  constructor( 
    private geolocation: GeolocationService,
    private http: Http
               ) { }

  getDate() {
    this.currentDate = new Date;
    let year = this.currentDate.getFullYear();
    let mm = (this.currentDate.getMonth() + 1);
    let dd = (this.currentDate.getDate());
    console.log([year,(mm>9?'':'0')+mm,(dd>9?'':'0')+dd].join(''));
    return [year,(mm>9?'':'0')+mm,(dd>9?'':'0')+dd].join('');
  }

  getCurrentPosition() {
    if(navigator.geolocation) {
      this.geolocation.getLocation()
      .subscribe(
        (position: Position) => {
          this.latitude = position.coords.latitude.toString();
          this.longitude = position.coords.longitude.toString();
          this.locationString =  this.latitude + "," + this.longitude;
          this.searchUrl = "https://api.foursquare.com/v2/venues/explore?ll=" + this.locationString + "&client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v="+this.getDate()+"&section=food&openNow=1";
          this.http.get(this.searchUrl)
          .subscribe(
            (data: any) => {
              console.log(data.json());
              this.resultsJson = data.json();
              this.resultsArray = this.resultsJson.response.groups[0].items;
            }
          )
        }
      )
    }
  }

  ngOnInit() {
    this.getDate();
    this.getCurrentPosition();
  }

}
