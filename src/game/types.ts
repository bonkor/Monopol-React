// src/game/types.ts

export interface Player {
  id: string;
  name: string;
  money: number;
  position: number;
  isBot?: boolean;
}

export interface Cell {
  id: number;
  name: string;
  type: 'property' | 'chance' | 'tax' | 'go' | 'jail' | 'free' | 'go_to_jail';
  price?: number;
  ownerId?: string;
}

export interface GameState {
  players: Player[];
  board: Cell[];
  currentPlayerId: string;
}
