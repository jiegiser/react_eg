/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-03-01 14:07:49
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-03-01 14:39:53
 */

import { takeEvery, put } from 'redux-saga/effects'
import { GET_INIT_LIST } from './actionTypes'
// import axios from 'axios'
import { initListAction } from './actionCreators'
function* getInitList() {
  const data = ["jiegiser", "jie", "React"]
  const action = initListAction(data)
  console.log(action)
  yield put(action)
  // try {
  //   const res = yield axios.get('/todolist.json')
  //   const action = initListAction(res.data)
  //   yield put(action)
  // } catch(e) {
  //   console.log('网络请求失败', e)
  // }
}
function* mySaga() {
  // 只要捕捉到GET_INIT_LIST类型，就会之后后面的getInitList方法
  yield takeEvery(GET_INIT_LIST, getInitList)
}
  
export default mySaga