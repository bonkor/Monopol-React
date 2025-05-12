// src/game/engine.ts

import { GameState, Player } from './types';

export class GameEngine {
  state: GameState;

  constructor(initialState: GameState) {
    this.state = initialState;
  }

  rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  movePlayer(playerId: string, steps: number) {
    const player = this.state.players.find(p => p.id === playerId);
    if (!player) return;

    player.position = (player.position + steps) % this.state.board.length;
    this.processLanding(player);
  }

  processLanding(player: Player) {
    const cell = this.state.board[player.position];
    // Здесь можно добавить обработку: покупки, налогов, карточек и т.д.
    console.log(`${player.name} landed on ${cell.name}`);
  }

  nextTurn() {
    const currentIndex = this.state.players.findIndex(p => p.id === this.state.currentPlayerId);
    const nextIndex = (currentIndex + 1) % this.state.players.length;
    this.state.currentPlayerId = this.state.players[nextIndex].id;
  }
}
