import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeSafariComponent } from './poke-safari.component';

describe('PokeSafariComponent', () => {
  let component: PokeSafariComponent;
  let fixture: ComponentFixture<PokeSafariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeSafariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeSafariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
