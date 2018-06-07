import React,{Component} from "react";
import Square from './Square'

class Board extends Component {

    renderSquare(i) {
        return (
            <Square key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />)
            ;
    }

    createField(size) {
        return [...new Array(size)].map((it, i) => {
            return (
                <div key={i} className="board-row">
                    {this.createRow(i, size)}
                </div>
            )
        })
    }

    createRow(row, size){
        return [...new Array(size)].map((it, i) => {
            return this.renderSquare(i + row * size)
        })
    }

    render() {
        return (
            <div>
                {this.createField(this.props.fieldSize)}
            </div>
        );
    }
}

export default Board