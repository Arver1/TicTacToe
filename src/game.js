import React, {Component} from 'react'
import {render} from 'react-dom'
import { hot } from 'react-hot-loader'

import Board from './components/Board'

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            coords: [{}]
        }
    }

    spotWhoIsNext(){
        return this.state.xIsNext ? 'X' : 'O';
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.spotWhoIsNext();
        this.setState({
            history: history.concat([{
                squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            coords: this.state.coords.concat([{
                pointCoords: `${((i / 3) ^ 0) + 1}, ${i % 3 + 1}`
            }])
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            coords: this.state.coords.slice(0, step +1)
        });
    }

    render() {
        const history = this.state.history;
        const coords = this.state.coords;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const status = winner ? `Winner: ${winner} ` : `Next player: ${this.spotWhoIsNext()}`;
        const moves = coords.map((step, move) => {
            const desc = move ?
                `Go to move ${this.state.coords[move].pointCoords}` :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

render(
    <Game />,
    document.getElementById('rect')
);


export default hot(module)(Game)

