import React, { Component } from 'react'

type Props ={
    text: string,
    href: string
}

export default class Brand extends Component<Props> {
  render() {
    return (
        <a href={this.props.href} className="navbar-brand">{this.props.text}</a>
                
    )
  }
}
