/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-22 10:37:57
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-22 11:23:40
 */
import React, { Component } from 'react'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    const { content } = this.props
    return (
      <div onClick={ this.handleClick }>{ content }</div>
    )
  }
  handleClick() {
    const { deleteItem, index } = this.props
    deleteItem(index)
  }
}
export default TodoItem