import { Component } from "react";

type Props = {
    show: boolean;
    children: React.ReactNode;
};

export default class Modal extends Component<Props> {
    
    constructor(props: Props) {
        super(props);
        this.state = { show: false };
    }

    render() {
        return (
            <div
                style={{
                    opacity: this.props.show ? 1 : 0,

                    background: "rgba(0,0,0,0.1)",
                }}
                className={`modal fade ${
                    this.props.show ? "show d-block" : "hide d-none"
                }`}
            >
                <div className="modal-dialog  h-75 ">
                    <div className="modal-content h-100">{this.props.children}</div>
                </div>
            </div>
        );
    }
}
