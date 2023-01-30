import  { Component } from "react";
import { PropChildren } from "../DefaultProp";

export default class ModalHeader extends Component<PropChildren> {
    render() {
        return <div className="modal-header">{this.props.children}</div>;
    }
}
