import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeBoardComponent } from './poke-board.component';

describe('PokeBoardComponent', () => {
  let component: PokeBoardComponent;
  let fixture: ComponentFixture<PokeBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
