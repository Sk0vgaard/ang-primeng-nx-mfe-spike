import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCarousel } from './pokemon-carousel';

describe('PokemonCarousel', () => {
  let component: PokemonCarousel;
  let fixture: ComponentFixture<PokemonCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
