import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Result } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('cards') cardsElement!: ElementRef;

  pokemonList: Result[] = [];
  pagina: number = 1;
  loading: boolean = false;
  searchTerm: string = '';

  constructor(
    private pokemonService: PokemonService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadList();
  }

  // Carga la lista de pokemones
  async loadList() {
    if (this.loading) return;
    this.loading = true;

    const size = this.searchTerm ? 1000 : 20;

    const newPokemonList = await this.pokemonService.getPokemons(
      this.pagina,
      size
    );

    if (this.searchTerm) {
      this.pokemonList = newPokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.pokemonList.push(...newPokemonList);
    }

    this.pagina++;
    this.loading = false;
  }

  // Cuando se hace scroll
  onScroll(event: any) {
    if (
      Math.round(
        this.cardsElement.nativeElement.clientHeight +
          this.cardsElement.nativeElement.scrollTop
      ) === event.target.scrollHeight
    ) {
      this.loadList();
    }
  }

  // Para el buscador
  onSearch() {
    this.pokemonList = [];
    this.pagina = 1;
    this.loadList();
  }

  // Cuando se da clic a una tarjeta
  async clickedCard(id: string) {
    const pokemon = await this.pokemonService.getPokemonForId(id);
    this.openModal(pokemon);
  }

  // Para que se abra el modal
  openModal(pokemon: Pokemon) {
    const dialogRef = this.dialog.open(ModalComponent, {
      autoFocus: false,
      data: {
        pokemon: pokemon,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadList();
      }
    });
  }
}
