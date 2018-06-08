import React,{Component} from "react";

function Square(props) {
    return (
        <button className = {props.winners ? ~props.winners.indexOf(props.number) ? 'square squareWin' : 'square' : 'square'}
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square