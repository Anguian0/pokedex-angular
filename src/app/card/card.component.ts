import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Result } from '../interfaces/pokeapi';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnChanges{

  constructor(
    private pokemonService: PokemonService
  ){}

  ngOnChanges(): void {
    this.extractInformation()
  }

  @Input() data?:Result;
  @Input() selected:boolean = false;
  @Output() clickCard = new EventEmitter<string>();
  id:string = "0";

  extractInformation(){
    if(this.data){
      this.id = this.data.url.substring(34, this.data.url.length-1);
    }
  }
}
