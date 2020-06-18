import React from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import terminal from 'jquery.terminal';
import 'jquery.terminal/css/jquery.terminal.css';

class GameConsole extends React.Component {
    state = {
        command: ""
    }

    componentDidMount() {
        const div = findDOMNode(this.refs.jterminal);
        terminal(window, $);
        console.log(this)
        this.term = $(div).terminal((cmd, t) => {
            t.echo('user said ' + cmd);
        }, {
            greetings: 'Game Terminal:'
        })
        // this.term.echo('fuck');
        this.props.round.status.forEach(s => this.term.echo(s))
        // term.echo('fuck');
    }



    render(){
        return (
            <div id={"console"}>
                <div ref="jterminal" id="jterminal">
                </div> 
            </div>
        )
    }
}

export default GameConsole