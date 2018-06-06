import React, {Component} from 'react'
import {render} from 'react-dom'
import { hot } from 'react-hot-loader'

import Board from './components/Board'

class Game extends Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

render(
    <Game />,
    document.getElementById('rect')
);


export default hot(module)(Game)

