/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-29 15:06:57
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-29 17:15:00
 */
import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
// 引入store数据仓库
import store from './store/index'
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'
class AntaTodoList extends Component {
  constructor(props) {
    super(props)
    // store.getState获取store数据
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    // 订阅store中的内容，store中的数据只要发生改变，里面的回调函数就会执行
    store.subscribe(this.handleStoreChange)
  }
  render() {
    return (
      <div style = {{ marginTop: '10px', marginLeft: '10px' }}>
        <div>
          <Input
            value = { this.state.inputValue }
            placeholder="Basic usage"
            style = {{ width: '300px', marginRight: '10px'}}
            onChange = { this.handleInputChange }
          />
          <Button type="primary" onClick = { this.handleBtnClick }>提交</Button>
        </div>
        <List
          style = {{ marginTop: '10px', width: '300px' }}
          bordered
          dataSource = { this.state.list }
          renderItem = { (item, index) => (
            <List.Item onClick = { this.handleItemDelete.bind(this, index) }>
              { item }
            </List.Item>
          )}
        />
      </div>
    )
  }
  handleInputChange(e) {
    // 修改store中的inputValue
    const action = getInputChangeAction(e.target.value)
    // 将action传递给store，通过reducers处理数据，然后返回数据
    store.dispatch(action)
  }
  handleStoreChange() {
    console.log('change')
    // 当知道store中的数据变化的时候直接替换组件中state中的数据
    this.setState(store.getState())
  }
  handleBtnClick() {
    const action = getAddItemAction()
    store.dispatch(action)
  }
  handleItemDelete(index) {
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }
}
export default AntaTodoList