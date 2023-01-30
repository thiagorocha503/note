import React, { Component } from "react";

type Props = {
    children: React.ReactNode;
    minHeight?: number | string;
};
export default class CardBody extends Component<Props> {
    render() {
        return (
            <div
           
                className="card-body"
            >
                {this.props.children}
            </div>
        );
    }
}
