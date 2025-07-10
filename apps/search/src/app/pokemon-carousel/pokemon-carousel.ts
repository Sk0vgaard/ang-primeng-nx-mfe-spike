import { Component, input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

interface Pokemon {
  name: {
    english: string;
  };
}

interface PokemonImage {
  name: string;
  image: string;
}

@Component({
  selector: 'app-pokemon-carousel',
  imports: [CarouselModule],
  templateUrl: './pokemon-carousel.html',
  styleUrl: './pokemon-carousel.scss',
  standalone: true,
})
export class PokemonCarousel implements OnInit {
  images: PokemonImage[] = [];
  search = input<string>('');

  ngOnInit() {
    fetch(
      'https://raw.githubusercontent.com/jherr/fower-pokemon-vue/master/public/pokemon.json'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.images = data
          .map((p: Pokemon) => ({
            image: `https://raw.githubusercontent.com/jherr/fower-pokemon-vue/master/public/pokemon/${p.name.english.toLowerCase()}.jpg`,
            name: p.name.english,
          }))
          .filter(
            (p: PokemonImage) =>
              p.name.toLowerCase().indexOf(this.search()) > -1
          )
          .slice(0, 10);
      });
  }
}
