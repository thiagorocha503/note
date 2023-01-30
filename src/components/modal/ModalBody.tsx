import React, { Component } from 'react'
import {PropChildren} from "../DefaultProp";

export default class ModalBody extends Component <PropChildren>{
  render() {
    return (
      <div className='modal-body'>{this.props.children}</div>
    )
  }
}
