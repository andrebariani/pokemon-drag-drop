import { TestBed } from '@angular/core/testing';

import { PokeListService } from './poke-list.service';

describe('PokeListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

 xit('should be created', () => {
    const service: PokeListService = TestBed.get(PokeListService);
    expect(service).toBeTruthy();
  });
});
