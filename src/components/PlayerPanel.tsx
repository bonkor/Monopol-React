// src/components/PlayerPanel.tsx

import { Player } from '../game/types';

export default function PlayerPanel({ player }: { player: Player }) {
  return (
    <div className="p-2 border rounded bg-white">
      <h2>{player.name}</h2>
      <p>Деньги: ${player.money}</p>
      <p>Позиция: {player.position}</p>
    </div>
  );
}
