/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-29 15:31:20
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-29 15:50:14
 */
import { createStore } from 'redux'
import reducer from './reducer'

// 创建一个数据公共存储仓库；reducer真正的数据存储
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store