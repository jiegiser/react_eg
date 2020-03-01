/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-03-01 14:57:36
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-03-01 14:59:08
 */
import { createStore } from 'redux'
import reducer from './reducer'
const store = createStore(reducer)

export default store