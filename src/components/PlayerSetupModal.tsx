import { useState } from 'react';
import { useGameStore } from '../game/state';

interface Props {
  onStart: () => void;
}

export default function PlayerSetupModal({ onStart }: Props) {
  const [playerName, setPlayerName] = useState('');
  const players = useGameStore((s) => s.players);
  const addPlayer = useGameStore((s) => s.addPlayer);

  const handleAdd = () => {
    if (playerName.trim()) {
      addPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">Добавьте игроков</h2>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Имя игрока"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Добавить игрока
        </button>
        <ul className="text-sm text-gray-700">
          {players.map((p) => (
            <li key={p.id}>— {p.name}</li>
          ))}
        </ul>
        <button
          onClick={onStart}
          disabled={players.length === 0}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Начать игру
        </button>
      </div>
    </div>
  );
}
