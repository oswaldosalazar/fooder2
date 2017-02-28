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
  // results : [Object];

  constructor( 
    private geolocation: GeolocationService,
    private http: Http
               ) { }

  getCurrentPosition() {
    if(navigator.geolocation) {
      this.geolocation.getLocation()
      .subscribe(
        (position: Position) => {
          this.latitude = position.coords.latitude.toString();
          this.longitude = position.coords.longitude.toString();
        }
      )
    }
  }

  ngOnInit() {
    this.locationString =  this.latitude + "," + this.longitude;
    this.searchUrl = "https://api.foursquare.com/v2/venues/explore?ll=" + this.locationString + "&client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v=20161031&section=food&openNow=1";
    // title = 'app works!';
    this.getCurrentPosition();
    console.log(this.searchUrl);
    this.http.get(this.searchUrl)
    .subscribe(
      (data: any) => {
        console.log(data);
      }

    )
    
    
  }

}
