/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-03-01 09:01:43
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-03-01 10:51:01
 */

 import React from 'react'
//  import React, { Component } from 'react'
 import { Input, Button, List } from 'antd'

//  无状态组件
const TodoListUI = props => {
  return (
    <div style = {{ marginTop: '10px', marginLeft: '10px' }}>
    <div>
      <Input
        value = { props.inputValue }
        placeholder="Basic usage"
        style = {{ width: '300px', marginRight: '10px'}}
        onChange = { props.handleInputChange }
      />
      <Button
        type="primary"
        onClick = { props.handleBtnClick }
      >提交</Button>
    </div>
    <List
      style = {{ marginTop: '10px', width: '300px' }}
      bordered
      dataSource = { props.list }
      renderItem = { (item, index) => (
        <List.Item
          onClick = { () => {
            props.handleItemDelete(index)
          } }
        >
          { item }
        </List.Item>
      )}
    />
  </div>   
  )
}
//  class TodoListUI extends Component {
//    render() {
//      return (
//       <div style = {{ marginTop: '10px', marginLeft: '10px' }}>
//         <div>
//           <Input
//             value = { this.props.inputValue }
//             placeholder="Basic usage"
//             style = {{ width: '300px', marginRight: '10px'}}
//             onChange = { this.props.handleInputChange }
//           />
//           <Button
//             type="primary"
//             onClick = { this.props.handleBtnClick }
//           >提交</Button>
//         </div>
//         <List
//           style = {{ marginTop: '10px', width: '300px' }}
//           bordered
//           dataSource = { this.props.list }
//           renderItem = { (item, index) => (
//             <List.Item
//               onClick = { (index) => {
//                 this.props.handleItemDelete(index)
//               } }
//             >
//               { item }
//             </List.Item>
//           )}
//         />
//       </div>
//      )
//    }
//  }
 export default TodoListUI