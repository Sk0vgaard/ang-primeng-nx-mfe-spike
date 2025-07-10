import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

interface Pokemon {
  name: {
    english: string;
  };
  image: string;
}

@Component({
  imports: [
    RouterModule,
    PanelModule,
    InputTextModule,
    FormsModule,
    CommonModule,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App implements OnInit {
  pokemonSource: Pokemon[] = [];
  pokemon: Pokemon[] = [];
  searchText = '';

  public onSearchChange(event: Event) {
    const search = (event.target as HTMLInputElement).value;
    this.searchText = search;
    if (search) {
      this.pokemon = this.pokemonSource
        .filter((pokemon) =>
          pokemon.name.english.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 20);
    } else {
      this.pokemon = this.pokemonSource.slice(0, 20);
    }
  }

  async ngOnInit() {
    fetch(
      'https://raw.githubusercontent.com/jherr/fower-pokemon-vue/master/public/pokemon.json'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.pokemonSource = data.map((p: Pokemon) => ({
          ...p,
          image: `https://raw.githubusercontent.com/jherr/fower-pokemon-vue/master/public/pokemon/${p.name.english.toLowerCase()}.jpg`,
        }));
        this.pokemon = this.pokemonSource.slice(0, 20);
      });
  }
}
