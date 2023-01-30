import { Component} from "react";

type Props = typeof FlatButton.defaultProps & {
    value: string;
    onclick: Function;
    color?: "primary" | "danger" | "info" | "secondary" | "warning";
};
class FlatButton extends Component<Props> {
    static defaultProps = {
        color: "primary",
    };

    handerClick = () => {
        this.props.onclick();
    };
    render() {
        return (
            <button
                className={`btn btn-${this.props.color} text-white`}
                onClick={this.handerClick}
                type="button"
            >
                {this.props.value}
            </button>
        );
    }
}

export default FlatButton;
