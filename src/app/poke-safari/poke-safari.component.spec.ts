import { PokeSafariComponent } from "./poke-safari.component";

describe('PokeSafariComponent', () => {
  let pokeSafariComponent: PokeSafariComponent;
  beforeEach(() => {
    let pokeListService = jasmine.createSpyObj(['getPokemons']);
    let snackBar = jasmine.createSpyObj(['openFromComponent']);

    pokeSafariComponent = new PokeSafariComponent(pokeListService, snackBar);
  })

  it('should create', () => {
    expect(pokeSafariComponent).toBeTruthy();
  });
});