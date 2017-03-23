import { Injectable } from '@angular/core';

@Injectable()
export class SendSelectedService {
  
  selected = [];

  constructor() { }

  getSelected(): Array<any> {
    console.log("From Service: ", this.selected);
    return this.selected;
  }



}