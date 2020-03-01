/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-29 15:31:20
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-03-01 10:29:15
 */
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