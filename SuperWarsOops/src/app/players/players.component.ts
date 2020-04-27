import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { SuperInterface } from '../../supers/SuperInterface';
import { Heros } from '../../supers/superlist';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlayersComponent implements OnInit {

  constructor() { }

  PLAYERS: SuperInterface[];

  ngOnInit(): void {
    this.PLAYERS = Heros;
    this.viewPlayers(this.initPlayers(this.PLAYERS));
  }

  i: number = 0;

  initPlayers = players => {
    let detailedPlayers = '';
    detailedPlayers = players.map((player, i) => {
      return {
        name: player.name,
        image: '../../assets/super-' + (i + 1) + '.png',
        strength: this.getRandomStrength(),
        type: i % 2 == 0 ? 'hero' : 'villain'
      };
    });

    return detailedPlayers;
  };


  /// get random strength
  getRandomStrength = () => {
    return Math.ceil(Math.random() * 100);
  };

  // Build player template
  buildPlayers = (players, type) => {
    let fragment = '';


    // Uses chaining of Array methods - filter, map and join

    fragment = players
      .filter(player => player.type == type)
      .map(
        player =>
          `
          <div class="player">
          <img src="${player.image}">
          <div class="name">${player.name}</div>
          <div class="strength">${player.strength}</div>
        </div>`
      )
      .join('');
    return fragment;
  };



  // Display players in HTML
  viewPlayers = players => {
    document.getElementById('hero').innerHTML = this.buildPlayers(
      players,
      'hero'
    );
    document.getElementById('villain').innerHTML = this.buildPlayers(
      players,
      'villain'
    );
  };

}
