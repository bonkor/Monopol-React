import { create } from 'zustand';

interface Player {
  id: string;
  name: string;
  position: number;
}

interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  addPlayer: (name: string) => void;
  rollDice: () => void;
  nextTurn: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  currentPlayerIndex: 0,
  addPlayer: (name) =>
    set((state) => ({
      players: [
        ...state.players,
        {
          id: crypto.randomUUID(),
          name,
          position: 0,
        },
      ],
    })),
  rollDice: () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    const { players, currentPlayerIndex } = get();
    const newPlayers = [...players];
    newPlayers[currentPlayerIndex].position =
      (newPlayers[currentPlayerIndex].position + roll) % 63; // 63 ячейки
    set({ players: newPlayers });
  },
  nextTurn: () => {
    set((state) => ({
      currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
    }));
  },
}));
