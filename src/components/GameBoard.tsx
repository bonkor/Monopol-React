import { useGameStore } from '../game/state';
import Dice3D from './Dice3D';

export default function GameBoard() {
  const players = useGameStore((s) => s.players);
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex);
  const currentPlayer = players.length > 0 ? players[currentPlayerIndex] : null;

  return (
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

        // Контейнер под Dice3D
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

        // Пропускаем остальные ячейки Dice-зоны
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
  );
}
