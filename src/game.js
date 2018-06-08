import React, {Component} from 'react'
import {render} from 'react-dom'
import { hot } from 'react-hot-loader'

import Board from './components/Board'

class Game extends Component {

    constructor(props) {
        super(props);
        this.fieldSize = 3;
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            coords: [{}],
            orderDirect: true
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
                pointCoords: `${((i / this.fieldSize) ^ 0) + 1}, ${i % this.fieldSize + 1}`
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

    changeOrder() {
        this.setState({
            orderDirect: !this.state.orderDirect
        })
    }

    render() {
        const history = this.state.history;
        const coords = this.state.coords;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const status = winner ? `Winner: ${winner} ` : `Next player: ${this.spotWhoIsNext()}`;
        let moves = coords.map((step, index) => {
            const desc = index ?
                `Go to move ${this.state.coords[index].pointCoords}` :
                'Go to game start';

            return (
                index === this.state.stepNumber ? (
                <li key={index}>
                    <button onClick={() => this.jumpTo(index)}><b>{desc}</b></button>
                </li>
                ) : (
                    <li key={index} a={index}>
                        <button onClick={() => this.jumpTo(index)}>{desc}</button>
                    </li>
                )
            );
        });
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        fieldSize = {this.fieldSize}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    {this.state.orderDirect ? <ol>{moves}</ol>: <ol reversed>{moves.reverse()}</ol>}
                </div>
                <div className="sort">
                <button onClick={() => this.changeOrder()}>Сортировать</button>
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

