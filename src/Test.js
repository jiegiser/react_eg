/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-28 08:48:14
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-28 09:00:14
 */
import React, { Component } from 'react'
class Test extends Component {
  // constructor(props) {
  //   super(props)
  // }
  // 当父组件的render函数被运行时，他的子组件的render都将被运行一次。
  render() {
    return (
      <div>{ this.props.content }</div>
    )
  }
}
export default Test