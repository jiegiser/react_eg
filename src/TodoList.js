/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-21 15:44:41
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-29 10:23:52
 */
import React, { Component, Fragment } from 'react'

// 引入子组件
import TodoItem from './TodoItem'
// import Test from './Test'
import axios from 'axios'
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
  // 在组件即将被挂载到页面的时刻自动执行--类似Vue的beforeMounted
  componentWillMount() {
    console.log('componentWillMount')
  }
  render () {
    console.log('render')
    // JSX -> JS 对象 -> 真实的DOM
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
            ref={ (input) => { this.input = input } }
          />
          <button onClick = { this.handleBtnClick }>提交</button>
        </div>
        <ul>
          { this.getTodoItem() }
        </ul>
        {/* <Test content = { this.state.inputValue }></Test> */}
      </Fragment>
    )
    // 虚拟dom
    // return (
    //   React.createElement('div', {}, 'item')
    // )
  }
  // 组件被挂在到页面之后，自动被执行 --Vue的mounted函数
  componentDidMount() {
    console.log('componentDidMount')
    axios.get('api/todolist').then(res => {
      console.log(res.data)
      this.setState(() => {
        return {
          list: [...res.data]
        }
      })
    })
    .catch(e => {
      console.log(e)
    })
  }
  // 组件被更新之前，他会自动被执行，
  shouldComponentUpdate() {
    // 需要返回一个bool类型，组件数据是否被更新
    console.log('shouldComponentUpdate')
    return true
  }
  // 组件被更新之前，他会自动执行，vue的beforeUpdated ，但是他在shouldComponentUpdate之后
  // 执行，如果shouldComponentUpdate返回true才会执行，如果返回false，就不会被执行
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  // 组件更新完成之后，他会被执行
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  // 当一个组件从父组件接收参数
  // 只要父组件的render函数被重新执行了，子组件的这个声明周期就会被执行
  // 如果这个组件第一次存在于父组件中，不会执行
  // 如果这个组件之前已经存在于父组件中，才会执行。
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }
  // 当这个组件即将被从页面中剔除的时候，会被执行
  componentWillUnmount() {
    console.log('componentWillUnmount')
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
    // this.input指向的是实际的input的DOM元素
    // const inputValue = this.input.value
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