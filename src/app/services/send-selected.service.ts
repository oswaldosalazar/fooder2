import { Injectable } from '@angular/core';

@Injectable()
export class SendSelectedService {
  
  selected = [];

  constructor() { }

  getSelected(): Array<any> {
    return this.selected;
  }

}