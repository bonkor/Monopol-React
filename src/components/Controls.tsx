import { useGameStore } from '../game/state';
import { rollDiceAndMove, nextTurn } from '../game/logic';

export default function Controls() {
  const currentPlayer = useGameStore((s) =>
    s.players.length > 0 ? s.players[s.currentPlayerIndex] : null
  );
  const rollDice = useGameStore((s) => s.rollDice);
  const next = useGameStore((s) => s.nextTurn);

  const handleRoll = () => {
    rollDiceAndMove(rollDice);
    nextTurn(next);
  };

  return (
    <div className="absolute bottom-4 right-4 p-4 bg-white shadow-lg rounded">
      <button
        onClick={handleRoll}
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
  );
}
