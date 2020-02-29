/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-29 17:03:35
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-29 17:13:48
 */
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