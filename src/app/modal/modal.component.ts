import {
  Component,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  @Input() pokemon: Pokemon | undefined;
  pokemonColor: any;
  pokemonDescription: any;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private pokemonService: PokemonService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.pokemon = this.data.pokemon;

    // Para las abilidades
    const abilities = this.pokemon?.abilities.map(
      (ability: any) => ability.ability.name
    );

    // Para el tipo
    this.pokemon = this.data.pokemon;
    const types = this.pokemon?.types.map((type: any) => type.type.name);
    // console.log(this.pokemon.);

    // Para el color
    // const idOrName = `${this.pokemon?.id}`; // ID o nombre del Pokémon que deseas obtener el color
    // this.pokemonService
    //   .getPokemonColor(idOrName)
    //   .then((response) => {
    //     this.pokemonColor = response;
    //     // console.log(this.pokemonColor.color.name);
    //   })
    //   .catch((error) => {
    //     console.log('Error obteniendo el color del Pokémon', error);
    //   });

    // Para la descripción y el color
    this.pokemonService
      .getDescriptionAndColor(this.pokemon?.id)
      .then((result) => {
        this.pokemonDescription = result.description;
        this.pokemonColor = result.color;
        // console.log(result.color, result.description);
      })
      .catch((error) => {
        console.log('Error obteniendo la descripción y el color del Pokémon', error);
      });
  }

  close(): void {
    // Close the dialog
    this.dialogRef.close();
  }
}
