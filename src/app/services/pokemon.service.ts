import { Injectable, inject } from '@angular/core';
import { Result } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor() {}

  async getPokemons(page: number, size: number = 20): Promise<Result[]> {
    const offset = (page - 1) * size;
    if (offset > 300) return [];
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`
    );
    const resJson = await res.json();
    return resJson.results;
  }

  async getPokemonForId(id: string): Promise<Pokemon> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await res.json();
  }

  getDescriptionAndColor = async(idOrName: any) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}`);
    const pokemonSpecies = await response.json();
    const habitat = pokemonSpecies.habitat.name;
    const color = pokemonSpecies.color.name;
    const description = pokemonSpecies.flavor_text_entries.find((entry: { language: { name: string; }; }) => entry.language.name === 'es')?.flavor_text as string;
    return { habitat, color, description };
  }

  // async getPokemonColor(idOrName: string): Promise<any> {
  //   const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}`);
  //   return await res.json();
  // }
}
