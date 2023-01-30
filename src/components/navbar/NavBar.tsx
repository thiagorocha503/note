import { Component } from "react";

type Props = {
    children?: React.ReactNode;
};
export default class NavBar extends Component<Props> {
    render() {
        return (
            <nav className="navbar bg-warning sticky-top navbar-dark">
                {this.props.children}{" "}
            </nav>
        );
    }
}
