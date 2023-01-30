import React, { Component } from "react";

type Props = {
    children: React.ReactNode;
    onClick?: Function
};
export default class Card extends Component<Props> {
    
    handlerClick = ()=>{
        this.props.onClick?.();
    }
    
    render() {
        return <div className="card"
        
          onClick={this.handlerClick}
        >{this.props.children}</div>;
    }
}
