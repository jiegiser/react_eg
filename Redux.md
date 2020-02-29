<!--
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-29 14:49:45
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-29 16:38:42
 -->
 Redux 就相当于Vue的Vuex数据层框架；原理基本也差不多。Redux = Reducer + Flux

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