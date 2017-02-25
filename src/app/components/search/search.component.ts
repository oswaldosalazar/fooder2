import { Component, OnInit } from '@angular/core';
import { geolocation }

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    title = 'app works!';
  }

}
