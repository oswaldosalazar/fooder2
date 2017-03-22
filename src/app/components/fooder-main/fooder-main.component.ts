import { Component, ViewEncapsulation, ViewChild, TemplateRef, EventEmitter, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2SwipeCardsModule } from '../../components/ng2-swipe-cards/index';
import { GeolocationService } from '../../services/geolocation.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-fooder-main',
  templateUrl: './fooder-main.component.html',
  styleUrls: ['./fooder-main.component.css']
})

export class FooderMainComponent implements OnInit {

  latitude : string;
  longitude: string;
  locationString: string;
  searchUrl : string;
  resultsJson : any;
  resultsArray : any;
  currentDate: Date;
  cards: any[] = [];
  cardCursor: number = 0;
  orientation: string = "x";
  overlay: any = {
    like: {
      backgroundColor: '#28e93b'
    },
    dislike: {
      backgroundColor: '#e92828'
    }
  };

  constructor(
    private geolocation: GeolocationService,
    private http: Http
  ) { }

  like(like) {
    var self = this;
    if (this.cards.length > 0) {
      self.cards[this.cardCursor++].likeEvent.emit({ like });
      // DO STUFF WITH YOUR CARD
    }
    console.log(this);
  }

  onCardLike(event) {
    var item = this.cards[this.cardCursor++];
    // DO STUFF WITH YOUR CARD
    // console.log(item.name);
  }

  onRelease(event) { }

  onAbort(event) { }

  onSwipe(event) { }

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
              this.resultsArray.map( elem => {
                let venueSearchUrl = "https://api.foursquare.com/v2/venues/"+elem.venue.id+"/photos?client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v="+this.getDate();
                this.http.get(venueSearchUrl)
                .subscribe((venuePicsUrl) => {
                  let card:any = {};
                  card.number += 1;
                  card.likeEvent = new EventEmitter();
                  card.destroyEvent = new EventEmitter();
                  card.venueId = elem.venue.id;
                  card.name = elem.venue.name;
                  card.rating = elem.venue.rating;
                  card.hours = elem.venue.hours;
                  card.address = elem.venue.location.address;
                  card.url = venuePicsUrl.json().response.photos.items[0].prefix+'300x250'+venuePicsUrl.json().response.photos.items[0].suffix;
                  this.cards.push(card);
                });
              });
            }
          );
        }
      );
    }
  }

  ngOnInit(){
    this.getNearRestaurants();
  }
}

