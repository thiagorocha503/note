import { Component } from "react";
import { PropChildren } from "../DefaultProp";

export default class ModalFooter extends Component<PropChildren> {
    render() {
        return <div className="modal-footer">{this.props.children}</div>;
    }
}
