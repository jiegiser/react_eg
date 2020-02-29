/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-29 15:34:02
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-29 16:57:42
 */
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './actionTypes'
// 拿到之前的数据已经需要操作的数据的信息，进行处理数据，并返回给store
 const defaultState = {
   inputValue: '',
   list: []
 }
// state,所有store存储的数据; action
// reducer 可以接收state，但是绝不能修改state
export default (state = defaultState, action) => {
  console.log(state, action)
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState =  JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if (action.type === ADD_TODO_ITEM && state.inputValue !== '') {
    const newState =  JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    console.log(newState)
    return newState
  }
  if (action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    return newState
  }
  return state
}