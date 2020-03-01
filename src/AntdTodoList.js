/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-29 15:06:57
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-03-01 14:38:32
 */
import React, { Component } from 'react'
import 'antd/dist/antd.css'
// 引入store数据仓库
import store from './store/index'
import TodoListUI from './TodoListUI'
// import axios from 'axios'
import {
  getInputChangeAction,
  getAddItemAction,
  getDeleteItemAction,
  getInitList
} from './store/actionCreators'
class AntaTodoList extends Component {
  constructor(props) {
    super(props)
    // store.getState获取store数据
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
    // 订阅store中的内容，store中的数据只要发生改变，里面的回调函数就会执行
    store.subscribe(this.handleStoreChange)
  }
  render() {
    return (
      <TodoListUI
        inputValue = { this.state.inputValue }
        list = { this.state.list }
        handleInputChange = { this.handleInputChange }
        handleBtnClick = { this.handleBtnClick }
        handleItemDelete = { this.handleItemDelete }
      />
    )
  }
  componentDidMount() {
    // redux-trunk
    // 如果发现action为一个函数，store.dispatch就会去执行一下这个函数，
    // 在这个函数里面我们去执行store.dispatch去分发请求，修改数据
    // const action = getTodoList()
    // store.dispatch(action)
    
    // 一般的方法
    // setTimeout(() => {
    //   const data = ["jiegiser", "jie", "React"]
    //   const action = initListAction(data)
    //   store.dispatch(action)
    // }, 2000)
    // axios.get('/todolist.json').then(res => {
    //   console.log(res)
    //   const data = res.data
    //   const action = initListAction(data)
    //   store.dispatch(action)
    // }).catch(e => {
    //   console.log(e)
    // })

    // redux-saga
    const action = getInitList()
    store.dispatch(action)

  }
  handleInputChange(e) {
    // 修改store中的inputValue
    const action = getInputChangeAction(e.target.value)
    // 将action传递给store，通过reducers处理数据，然后返回数据
    store.dispatch(action)
  }
  handleStoreChange() {
    console.log('change')
    // 当知道store中的数据变化的时候直接替换组件中state中的数据
    this.setState(store.getState())
  }
  handleBtnClick() {
    const action = getAddItemAction()
    store.dispatch(action)
  }
  handleItemDelete(index) {
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }
}
export default AntaTodoList