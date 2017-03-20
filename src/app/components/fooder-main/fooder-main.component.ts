import { Component, ViewEncapsulation, ViewChild, TemplateRef, EventEmitter, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2SwipeCardsModule } from '../../components/ng2-swipe-cards/index';
import { GeolocationService } from '../../services/geolocation.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-fooder-main',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './fooder-main.component.html',
  styleUrls: ['./fooder-main.component.css']
})

export class FooderMainComponent implements OnInit {
  // @ViewChild('cardLog') cardLogContainer: any;
  // @ViewChild('tinderCardLog') tinderCardLogContainer: any;

  latitude : string;
  longitude: string;
  locationString: string;
  searchUrl : string;
  resultsJson : any;
  resultsArray : any;
  currentDate: Date;
  cardTypes: any = [];

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

  cardLogs: any = [];
  tinderCardLogs: any = [];


  constructor(
    private geolocation: GeolocationService,
    private http: Http
  ) { }

  like(like) {
    var self = this;
    if (this.cards.length > 0) {
      self.cards[this.cardCursor++].likeEvent.emit({ like });
      // DO STUFF WITH YOUR CARD
      this.tinderCardLogs.push("callLike(" + JSON.stringify({ like }) + ")");
      // this.scrollToBottom(this.tinderCardLogContainer);
    }
  }

  onCardLike(event) {
    var item = this.cards[this.cardCursor++];
    // DO STUFF WITH YOUR CARD
    this.tinderCardLogs.push("onLike(" + JSON.stringify(event) + ")");
    // this.scrollToBottom(this.tinderCardLogContainer);
  }

  getKittenUrl() {
    var w = 500 - Math.floor((Math.random() * 100) + 1);
    var h = 500 - Math.floor((Math.random() * 100) + 1);
    return "https://placekitten.com/" + w + "/" + h;
  }

  onRelease(event) {
    this.cardLogs.push("onRelease(event)");
    // this.scrollToBottom(this.cardLogContainer);

  }

  onAbort(event) {
    this.cardLogs.push("onAbort(event)");
    // this.scrollToBottom(this.cardLogContainer);
  }

  onSwipe(event) {
    this.cardLogs.push("onSwipe(event)");
    // this.scrollToBottom(this.cardLogContainer);
  }

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
                let venueSearchUrl = "https://api.foursquare.com/v2/venues/"+elem.venue.id+"/photos?client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v="+this.getDate();
                this.http.get(venueSearchUrl)
                .subscribe((venuePicsUrl) => {
                  let final:any = {};
                  final.likeEvent = new EventEmitter(),
                  final.destroyEvent = new EventEmitter(),
                  final.venueId = elem.venue.id;
                  final.name = elem.venue.name;
                  final.rating = elem.venue.rating;
                  final.hours = elem.venue.hours;
                  final.address = elem.venue.location.address;
                  final.url = venuePicsUrl.json().response.photos.items[0].prefix+'300x200'+venuePicsUrl.json().response.photos.items[0].suffix;
                  this.cards.push(final);
                })
              })
            }
          );
        }
      )
    }
  }

  ngOnInit(){
    this.getNearRestaurants();
  }
}

