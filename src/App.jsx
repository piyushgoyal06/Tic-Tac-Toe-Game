import { useEffect, useState } from 'react'
import Board from './components/Board.jsx'
import { calculateWinner } from './utils/calculateWinner.js'

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0 })

  const { winner, line } = calculateWinner(squares)
  const isDraw = !winner && squares.every(Boolean)
  const nextPlayer = xIsNext ? 'X' : 'O'

  useEffect(() => {
    const saved = localStorage.getItem('ttt-state')
    if (saved) {
      try {
        const { squares, xIsNext, scores } = JSON.parse(saved)
        setSquares(squares)
        setXIsNext(xIsNext)
        setScores(scores)
      } catch { }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'ttt-state',
      JSON.stringify({ squares, xIsNext, scores })
    )
  }, [squares, xIsNext, scores])

  function handlePlay(index) {
    if (squares[index] || winner) return
    const next = squares.slice()
    next[index] = nextPlayer
    setSquares(next)
    setXIsNext(!xIsNext)
  }

  function resetBoard() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  function resetGame() {
    resetBoard()
    setScores({ X: 0, O: 0 })
    localStorage.removeItem('ttt-state')
  }

  useEffect(() => {
    if (winner) {
      setScores((s) => ({ ...s, [winner]: s[winner] + 1 }))
    }
  }, [winner])

  let status = ''
  if (winner) status = `Winner: ${winner}`
  else if (isDraw) status = 'Draw!'
  else status = `Next player: ${nextPlayer}`

  return (
    <div className="app">
      <header className="header">
        <h1>Tic Tac Toe</h1>
      </header>

      <div className="scoreboard">
        <div className="score"><span>X</span> {scores.X}</div>
        <div className="score"><span>O</span> {scores.O}</div>
      </div>

      <Board
        squares={squares}
        onPlay={handlePlay}
        winningLine={line}
      />

      <div className="status">
        <span>{status}</span>
      </div>

      <div className="controls">
        <button onClick={resetBoard}>New Round</button>
        <button className="secondary" onClick={resetGame}>Reset All</button>
      </div>
      
    </div>
  )
}