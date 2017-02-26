import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  location : any;


  constructor( private geolocation: GeolocationService ) { }

  getCurrentPosition() {
    if(navigator.geolocation) {
      this.geolocation.getCurrentPosition()
      .subscribe(
        (position: Position) => {
          console.log(position)
        }
      )
    }
  }
  ngOnInit() {
    // title = 'app works!';
    this.getCurrentPosition();
    
  }

}
