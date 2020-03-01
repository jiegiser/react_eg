/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-03-01 14:52:29
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-03-01 16:05:47
 */

 import React from 'react'
 import { connect } from 'react-redux'
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