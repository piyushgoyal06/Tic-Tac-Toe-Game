import Square from './Square.jsx'
export default function Board({ squares, onPlay, winningLine }) {
    function renderSquare(i) {
        const isWinning = winningLine?.includes(i)
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => onPlay(i)}
                highlight={isWinning}
            />
        )
    }

    return (
        <div className="board">
            {[0, 1, 2].map((row) => (
                <div className="board-row" key={row}>
                    {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
                </div>
            ))}
        </div>
    )
}