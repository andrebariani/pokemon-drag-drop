export class Pokemon {
    id: number;
    name: {
      english: string,
      japanese: string,
      chinese: string,
      french: string
    };
    type: any[];
    base: {
      HP: number,
      Attack: number,
      Defense: number,
      SpAttack: number,
      SpDefense: number,
      Speed: number
    }
}