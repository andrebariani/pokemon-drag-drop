import { TestBed } from '@angular/core/testing';

import { PokeBoardService } from './poke-board.service';

describe('PokeBoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokeBoardService = TestBed.get(PokeBoardService);
    expect(service).toBeTruthy();
  });
});
