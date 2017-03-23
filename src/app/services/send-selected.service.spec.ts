/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SendSelectedService } from './send-selected.service';

describe('SendSelectedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendSelectedService]
    });
  });

  it('should ...', inject([SendSelectedService], (service: SendSelectedService) => {
    expect(service).toBeTruthy();
  }));
});
