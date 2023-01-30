import React, { Component } from "react";

type Props = typeof TextField.defaultProps & {
    value: string;
    placeholder?: string;
    onChange: Function;
    onSubmit?: Function;
};
class TextField extends Component<Props> {
    static defaultProps = {
        isValid: true,
    };

    handerKeyDown = (e: any) => {
        if (e.key === "Enter") {
            this.props.onSubmit?.();
        }
    };

    handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    };
    render() {
        return (
            <input
                style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "rgba(0, 0, 0, 85%)",
                    border: 0,
                    outline: 0,
                }}
                type="text"
                placeholder="Enter to do"
                onChange={this.handlerChange}
                value={this.props.value}
                onKeyDown={this.handerKeyDown}
            />
        );
    }
}

export default TextField;
