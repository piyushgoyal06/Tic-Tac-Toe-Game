export default function Square({ value, onClick, highlight }) {
    return (
        <button
            className={`square ${highlight ? 'highlight' : ''} ${value ? 'filled' : ''}`}
            onClick={onClick}
            aria-label={value ? `Square with ${value}` : 'Empty square'}
        >
            {value}
        </button>
    )
}