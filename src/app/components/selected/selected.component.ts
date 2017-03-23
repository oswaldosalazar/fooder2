import { Component, 
         OnInit } from '@angular/core';
import { SendSelectedService } from '../../services/send-selected.service'

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent implements OnInit {

  selectedCards = [];

  constructor( 
    private sendSelected: SendSelectedService
  ) { }

  displaySelected () {
    this.selectedCards = this.sendSelected.selected;
    this.sendSelected.selected = [];
  }

  ngOnInit() {
    this.displaySelected();
  }

}
