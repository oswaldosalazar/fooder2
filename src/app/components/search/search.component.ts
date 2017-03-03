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
  currentDate: Date;
  // final: any;
  cardTypes: any;

  constructor( 
    private geolocation: GeolocationService,
    private http: Http
               ) { }

  getDate() {
    this.currentDate = new Date;
    let year = this.currentDate.getFullYear();
    let mm = (this.currentDate.getMonth() + 1);
    let dd = (this.currentDate.getDate());
    return [year,(mm>9?'':'0')+mm,(dd>9?'':'0')+dd].join('');
  }

  getNearRestaurants() {
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
              this.resultsJson = data.json();
              this.resultsArray = this.resultsJson.response.groups[0].items;
              this.resultsArray.map( (elem) => {
                var venueSearchUrl = "https://api.foursquare.com/v2/venues/"+elem.venue.id+"/photos?client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v=2"+this.getDate();
                this.http.get(venueSearchUrl)
                .subscribe((venuePicsUrl) => {
                  let final: any;
                  console.log(venuePicsUrl.json());
                  // final.venueId = elem.venue.id;
                  // final.name = elem.venue.name;
                  // final.hours = elem.venue.hours;
                  // final.address = elem.venue.location.address;
                  // final.image = venuePicsUrl.json().data.response.photos.items[2].prefix+'300x400'+venuePicsUrl.json().data.response.photos.items[2].suffix;
                  // this.cardTypes.push(final);
                })
              })
            }
          )
        }
      )
    }
  }

  ngOnInit() {
    this.getNearRestaurants();
  }

}
