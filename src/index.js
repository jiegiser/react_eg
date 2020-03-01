/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-04 11:58:19
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-03-01 15:16:54
 */
import React from 'react';
import ReactDOM from 'react-dom';
// import TodoList from './TodoList';
// import App from './App'
// import AntdTodoList from './AntdTodoList'


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
ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
