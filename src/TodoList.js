/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-21 15:44:41
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-22 11:35:36
 */
import React, { Component, Fragment } from 'react'

// 引入子组件
import TodoItem from './TodoItem'
// 引入样式
import './style.css'

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
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }
  render () {
    return (
      <Fragment>
        <div>
          <label htmlFor="insertArea">输入内容</label>
          { /*这是一个注释*/ }
          <input
            id="insertArea"
            className = 'input'
            value = { this.state.inputValue }
            onChange = { this.handleInputChange }
          />
          <button onClick = { this.handleBtnClick }>提交</button>
        </div>
        <ul>
          { this.getTodoItem() }
        </ul>
      </Fragment>
    )
  }
  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <div>
          <TodoItem
            content = { item }
            index = { index }
            deleteItem = { this.handleItemDelete }
          />
        </div>
      )
    })
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
  handleItemDelete(index) {
    // immutable
    // state 不许与我们做任何改变
    const list = [...this.state.list]
    list.splice(index, 1)
    this.setState({
      list
    })
  }
}
export default TodoList