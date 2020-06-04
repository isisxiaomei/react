import React, { Component } from 'react';

class XiaojiejieIterm extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <li onClick={this.handleClick}>
                {this.props.index}
            </li>
        );
    }
    handleClick(){
        this.props.index="hello";
        console.log(this.props.index);
        // this.props.list = []
        // console.log(this.props.inputValue);
        // console.log(this.props.index);
        // this.props.deleteIterm(this.props.index);
    }
}

export default XiaojiejieIterm;