import React, { Component } from 'react'
import { PropChildren } from './DefaultProp'


export default class Container extends Component<PropChildren> {
  render() {
    return (
      <div className='container-fluid'>{this.props.children}</div>
    )
  }
}
