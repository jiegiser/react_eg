/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-21 15:44:41
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-21 19:39:35
 */
import React, { Component, Fragment } from 'react'

class TodoList extends Component {
  constructor(props) {
    // 组件继承
    super(props)
    // react中定义数据要放在状态之中
    // 组件的状态
    this.state = {
      inputValue: '',
      list: []
    }
  }
  render () {
    return (
      <Fragment>
        <div>
          <input value = { this.state.inputValue }
            onChange = { this.handleInputChange.bind(this) }
          />
          <button onClick = { this.handleBtnClick.bind(this) }>提交</button>
        </div>
        <ul>
          {
            this.state.list.map((item, index) => {
            return <li key={ index }>{ item }</li>
            })
          }
        </ul>
      </Fragment>
    )
  }
  handleInputChange(e) {
    console.log(e.target.value)
    this.setState({
      inputValue: e.target.value
    })
  }
  handleBtnClick() {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }
}
export default TodoList