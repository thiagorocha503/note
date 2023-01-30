import { Component } from "react";

type Props = {
    placeHolder?: string;
    value: string;
    onChange: Function;
};
export default class TextAreaField extends Component<Props> {
    render() {
        return (
            <textarea
                value={this.props.value}
                onChange={(e) => {
                    this.props.onChange(e.target.value);
                }}
                placeholder={this.props.placeHolder}
                style={{
                    border: 0,
                    outline: 0,
                    resize: "none",
                    overflowX: "hidden",
                    width: "100%",
                    height: "100%",
                }}
            ></textarea>
        );
    }
}
