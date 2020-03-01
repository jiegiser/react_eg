<!--
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-29 14:49:45
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-03-01 11:08:04
 -->
 Redux 就相当于Vue的Vuex数据层框架；原理基本也差不多。Redux = Reducer + Flux

具有以下原则：
- store 是唯一的
- 只有 store 能够改变自己的内容（在reducer中只是返回了新的store数据）
- reducer 必须是纯函数（给定固定的输入，就一定会有固定的输出，而且不会有任何副作用）

代码如下：
```js
import { createStore } from 'redux'
import reducer from './reducer'

// 创建一个数据公共存储仓库；reducer真正的数据存储
const store = createStore(
  reducer,
  // 第二个参数是浏览器使用了redux调试工具  
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store


//-------------------------------- reducer.js

// 拿到之前的数据已经需要操作的数据的信息，进行处理数据，并返回给store
 const defaultState = {
   inputValue: '123',
   list: [1, 2]
 }
// state,所有store存储的数据; action
// reducer 可以接收state，但是绝不能修改state
export default (state = defaultState, action) => {
  console.log(state, action)
  if (action.type === 'change_input_value') {
    const newState =  JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if (action.type === 'add_toto_item' && state.inputValue !== '') {
    const newState =  JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    console.log(newState)
    return newState
  }
  return state
}

// -----------------在组件中使用

import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
// 引入store数据仓库
import store from './store/index'
class AntaTodoList extends Component {
  constructor(props) {
    super(props)
    // store.getState获取store数据
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    // 订阅store中的内容，store中的数据只要发生改变，里面的回调函数就会执行
    store.subscribe(this.handleStoreChange)
  }
  render() {
    return (
      <div style = {{ marginTop: '10px', marginLeft: '10px' }}>
        <div>
          <Input
            value = { this.state.inputValue }
            placeholder="Basic usage"
            style = {{ width: '300px', marginRight: '10px'}}
            onChange = { this.handleInputChange }
          />
          <Button type="primary" onClick = { this.handleBtnClick }>提交</Button>
        </div>
        <List
          style = {{ marginTop: '10px', width: '300px' }}
          bordered
          dataSource = { this.state.list }
          renderItem = { item => (
            <List.Item>
              { item }
            </List.Item>
          )}
        />
      </div>
    )
  }
  handleInputChange(e) {
    // 修改store中的inputValue
    const action = {
      type: 'change_input_value',
      value: e.target.value
    }
    // 将action传递给store，通过reducers处理数据，然后返回数据
    store.dispatch(action)
  }
  handleStoreChange() {
    console.log('change')
    // 当知道store中的数据变化的时候直接替换组件中state中的数据
    this.setState(store.getState())
  }
  handleBtnClick() {
    const action = {
      type: 'add_toto_item'
    }
    store.dispatch(action)
  }
}
export default AntaTodoList
```

流程是首先我们使用store中存储的数据，通过store.getState()获取到数据，然后input监听数据数据一旦变化，就修改store中的数据:store.dispatch(action),
然后在reducer中，进行判断操作类型type，进行修改对应的数据（数据通过深拷贝一份进行修改）；然后在组件中监听store数据的变化，一旦变化重新通过store.getState()获取到数据进行更新组件中store中的数据，进行渲染。

上面的项目可以这样拆分：
```js
// 组件
import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
// 引入store数据仓库
import store from './store/index'
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'
class AntaTodoList extends Component {
  constructor(props) {
    super(props)
    // store.getState获取store数据
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    // 订阅store中的内容，store中的数据只要发生改变，里面的回调函数就会执行
    store.subscribe(this.handleStoreChange)
  }
  render() {
    return (
      <div style = {{ marginTop: '10px', marginLeft: '10px' }}>
        <div>
          <Input
            value = { this.state.inputValue }
            placeholder="Basic usage"
            style = {{ width: '300px', marginRight: '10px'}}
            onChange = { this.handleInputChange }
          />
          <Button type="primary" onClick = { this.handleBtnClick }>提交</Button>
        </div>
        <List
          style = {{ marginTop: '10px', width: '300px' }}
          bordered
          dataSource = { this.state.list }
          renderItem = { (item, index) => (
            <List.Item onClick = { this.handleItemDelete.bind(this, index) }>
              { item }
            </List.Item>
          )}
        />
      </div>
    )
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

// './store/index'
import { createStore } from 'redux'
import reducer from './reducer'

// 创建一个数据公共存储仓库；reducer真正的数据存储
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store

// './store/actionCreators'
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes'
export const getInputChangeAction = value => {
  return {
    type: CHANGE_INPUT_VALUE,
    value
  }
}

export const getAddItemAction = () => {
  return {
    type: ADD_TODO_ITEM
  }
}

export const getDeleteItemAction = index => {
  return {
    type: DELETE_TODO_ITEM,
    index
  } 
}

// './actionTypes'

export const CHANGE_INPUT_VALUE = 'change_input_value'
export const ADD_TODO_ITEM = 'add_todo_item'
export const DELETE_TODO_ITEM = 'delete_todo_item'
```

## Redux-thunk 中间件使用发送请求

首先安装yarn add redux-thunk，使用：
```js
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

// 创建一个数据公共存储仓库；reducer真正的数据存储
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
```
如果有多个中间件使用，比如之前使用的redux devtools跟thunk中间件需要一起使用：
这是redux devtools的一个解决方法
```js
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
// https://github.com/reduxjs/redux-thunk
import thunk from 'redux-thunk'
// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(
  applyMiddleware(...[thunk]),
);
// 创建一个数据公共存储仓库；reducer真正的数据存储
const store = createStore(
  reducer,
  enhancer
)

export default store
```

使用redux-thunk，action不仅仅是一个对象，就像前面写的只返回type跟value的对象，可以
返回一个函数；然后我们调用store.dispatch(action)直接会执行这个返回的函数，然后在返回的函数里面我们去分发action，当action为返回
一个函数的时候，他会有一个参数dispatch分发，就相当于store.dispatch，我们就可以在返回的函数里面去分发action。
下面代码是使用thunk：
```js
// 在组件中使用
  // import axios from 'axios'
  import {
    getTodoList 
  } from './store/actionCreators'
  componentDidMount() {
    // 如果发现action为一个函数，store.dispatch就会去执行一下这个函数，
    // 在这个函数里面我们去执行store.dispatch去分发请求，修改数据
    const action = getTodoList()
    store.dispatch(action) // 这里action返回的是一个函数

    // 如果不使用redux-thunk。我们需要在组件的声明周期里面去执行发送异步请求，
    // 如果有很多方法都需要在组件的生命周期里面去执行，这样会导致一个组件会很杂乱，不好维护。
    axios.get('/todolist.json').then(res => {
      console.log(res)
      const data = res.data
      const action = initListAction(data)
      store.dispatch(action)
    }).catch(e => {
      console.log(e)
    })
  }

  // './store/actionCreators'
// 获取异步请求的数据
// 返回一个函数
export const getTodoList = () => {
  // 当action返回为一个函数的时候，会接收到一个dispatch方法
  return (dispatch) => {
    axios.get('/todolist.json').then(res => {
      console.log(res)
      const data = res.data
      const action = initListAction(data)
      dispatch(action)
    }).catch(e => {
      console.log(e)
    })
  }
}
```
