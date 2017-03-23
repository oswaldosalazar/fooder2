import { Component, OnInit } from '@angular/core';
import { SendSelectedService } from '../../services/send-selected.service'

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent implements OnInit {

  constructor( 
    private sendSelected: SendSelectedService
  ) { }

  displaySelected () {
    console.log("From Selected Component: ", this.sendSelected.selected)
  }

  ngOnInit() {
    this.displaySelected();
  }

}
