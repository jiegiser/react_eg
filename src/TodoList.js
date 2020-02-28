/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-21 15:44:41
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-28 08:52:41
 */
import React, { Component, Fragment } from 'react'

// 引入子组件
import TodoItem from './TodoItem'
import Test from './Test'
// 引入样式
import './style.css'

class TodoList extends Component {
  constructor(props) {
    // 组件继承
    super(props)
    // react中定义数据要放在状态之中
    // 组件的状态
    // 当组件的state或者props发生改变的时候，render函数就会重新执行
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
        <Test content = { this.state.inputValue }></Test>
      </Fragment>
    )
  }
  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (
        <TodoItem
          key = { index }
          content = { item }
          index = { index }
          deleteItem = { this.handleItemDelete }
        />
      )
    })
  }
  handleInputChange(e) {
    console.log(e.target.value)
    // this.setState({
    //   inputValue: e.target.value
    // })
    // 写成函数的形式是异步返回的
    const inputValue = e.target.value
    this.setState(() => {
      return {
        inputValue
      }
    })
  }
  handleBtnClick() {
    // prevState 是修改之前的数据，也就是this.state
    this.setState((prevState) => {
      return {
        list: [...prevState.list, prevState.inputValue],
        inputValue: ''
      }
    })
  }
  handleItemDelete(index) {
    // immutable
    // state 不许与我们做任何改变
    this.setState((prevState) => {
      const list  = [...prevState.list]
      list.splice(index, 1)
      return {
        list
      }
    })
  }
}
export default TodoList