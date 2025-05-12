import { useState } from 'react';
import { useGameStore } from './game/state';
import { rollDiceAndMove, nextTurn } from './game/logic';
import Dice3D from './components/Dice3D';

export default function App() {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const players = useGameStore((state) => state.players);
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex);
  const addPlayer = useGameStore((state) => state.addPlayer);
  const rollDice = useGameStore((s) => s.rollDice);
  const next = useGameStore((s) => s.nextTurn);

  const currentPlayer = players.length > 0 ? players[currentPlayerIndex] : null;

  const handleAddPlayer = () => {
    if (playerName.trim()) {
      addPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  const handleStartGame = () => {
    if (players.length > 0) {
      setGameStarted(true);
    }
  };

  const handleRollDice = () => {
    rollDiceAndMove(rollDice);
    nextTurn(next);
  };

  return (
    <div className="w-screen h-screen bg-white relative overflow-hidden">
      {!gameStarted ? (
        <div className="absolute inset-0 flex items-center justify-center">
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
              onClick={handleAddPlayer}
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
              onClick={handleStartGame}
              disabled={players.length === 0}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              Начать игру
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Игровое поле */}
          <div className="grid grid-cols-11 grid-rows-11 w-full h-full">
            {Array.from({ length: 121 }, (_, index) => {
              const row = Math.floor(index / 11);
              const col = index % 11;

              const isPerimeter = row === 0 || row === 10 || col === 0 || col === 10;
              const isCross = (row === 5 || col === 5) && !isPerimeter;
              const isCenter = row === 5 && col === 5;
              const isDiceZone = row >= 6 && row <= 9 && col >= 6 && col <= 9;

              let cellIndex: number | null = null;

              if (isPerimeter) {
                if (row === 0) cellIndex = col;
                else if (col === 10) cellIndex = 10 + row - 1;
                else if (row === 10) cellIndex = 10 + 9 + (10 - col);
                else if (col === 0) cellIndex = 10 + 9 + 10 + (10 - row);
              } else if (isCross) {
                if (col === 5) cellIndex = 42 + (row < 5 ? row : row - 1);
                if (row === 5) cellIndex = 52 + (col < 5 ? col : col - 1);
              }

              const isPlayerHere = currentPlayer && currentPlayer.position === cellIndex;

              // Вставляем контейнер для кубика только в левом верхнем углу блока
              if (row === 6 && col === 6) {
                return (
                  <div
                    key={index}
                    className="col-span-4 row-span-4 bg-white border border-gray-400 flex items-center justify-center"
                    style={{ gridColumn: '7 / span 4', gridRow: '7 / span 4' }}
                  >
                    <Dice3D />
                  </div>
                );
              }

              // Пропускаем остальные ячейки блока с кубиком
              if (isDiceZone && !(row === 6 && col === 6)) return null;

              return (
                <div
                  key={index}
                  className={`relative flex items-center justify-center text-xs font-mono ${
                    isCenter
                      ? 'bg-yellow-400 font-bold'
                      : cellIndex !== null
                      ? 'bg-green-200 border border-gray-300'
                      : ''
                  }`}
                >
                  {isPlayerHere && (
                    <div className="absolute w-3 h-3 bg-red-600 rounded-full" />
                  )}
                  <span className="opacity-60">
                    {isCenter ? 'СТАРТ (44)' : cellIndex !== null ? cellIndex : ''}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Управление */}
          <div className="absolute bottom-4 right-4 p-4 bg-white shadow-lg rounded">
            <button
              onClick={handleRollDice}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Бросить кубик
            </button>
            <div className="mt-2 text-sm text-gray-700">
              {currentPlayer && (
                <>
                  <div>Игрок: {currentPlayer.name}</div>
                  <div>Позиция: {currentPlayer.position}</div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
