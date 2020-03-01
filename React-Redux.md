<!--
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-03-01 14:50:47
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-03-01 16:18:37
 -->
首先进行安装：yarn add react-redux,
然后在项目的入口进行引入react-redux代码：
```js
import React from 'react';
import ReactDOM from 'react-dom';
import ReactReduxTodoList from './ReactReduxTodoList'
import { Provider } from 'react-redux'
import store from './reactReduxStore/index'
// pwa技术
import * as serviceWorker from './serviceWorker'
const App = (
  // Provider 会将store中的数据提供给内部的所有的组件
  <Provider store = { store }>
    <ReactReduxTodoList></ReactReduxTodoList>
  </Provider>
)
// 使用jsx语法就必须引用react
ReactDOM.render(App, document.getElementById('root'))
serviceWorker.unregister();

// './reactReduxStore/index' 中的内容：
import { createStore } from 'redux'
import reducer from './reducer'
const store = createStore(reducer)
// './reducer'就跟之前一样，没有进行拆分
const defaultState = {
  inputValue: '',
  list: []
}
export default (state = defaultState, action) => {
  if (action.type === 'change_input_value') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if (action.type === 'add_item') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  if (action.type === 'delete_item') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    return newState
  }
  return state
}

export default store
```
然后在组件中：
```js
 import React from 'react'
 import { connect } from 'react-redux'
 //  无状态组件
 const ReactReduxTodoList = props => {
  const { inputValue, changeInputValue, handleClick, list, handleDelete } = props
  return (
  <div>
    <div>
      <input
        value = { inputValue }
        onChange = { changeInputValue }
      />
      <button onClick = { handleClick }>提交</button>
    </div>
    <ul>
      {
        list.map((item, index) => {
          return (
            <li
              key = { index }
              onClick = { handleDelete.bind(this, index) }
             >
               { item }
            </li>
           )
        })
      }
    </ul>
  </div>
  )
 }
 // 将store的数据映射到组件，变成组件的props
 const mapStateToProps = state => {
   return {
     inputValue: state.inputValue,
     list: state.list
   }
 }
 const mapDispatchToProps = dispatch => {
   return {
    changeInputValue(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }
      dispatch(action)
    },
    handleClick () {
      const action = {
        type: 'add_item'
      }
      dispatch(action)
    },
    handleDelete(index) {
      const action = {
        type: 'delete_item',
        index
      }
      console.log(action, 'action')
      dispatch(action)
    }
   }
 }
//  ReactReduxTodoList组件与store进行连接,mapStateToProps就是连接的规则
//  mapDispatchToProps 将dispatch挂载到props
export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxTodoList)
```
