/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-29 17:03:35
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-03-01 14:14:35
 */
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION, GET_INIT_LIST } from './actionTypes'
// import axios from 'axios'
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

export const initListAction = data => {
  return {
    type: INIT_LIST_ACTION,
    data
  }
}

// 获取异步请求的数据 redux-thunk
// 返回一个函数
export const getTodoList = () => {
  // 当action返回为一个函数的时候，会接收到一个dispatch方法
  return (dispatch) => {
    setTimeout(() => {
      const data = ["jiegiser", "jie", "React"]
      const action = initListAction(data)
      dispatch(action)
    }, 2000)
    // axios.get('/todolist.json').then(res => {
    //   console.log(res)
    //   const data = res.data
    //   const action = initListAction(data)
    //   dispatch(action)
    // }).catch(e => {
    //   console.log(e)
    // })
  }
}

// redux-saga
export const getInitList = () => {
  return {
    type: GET_INIT_LIST
  }
}