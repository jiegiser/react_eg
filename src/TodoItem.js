/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-22 10:37:57
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-28 16:59:28
 */
import React, { Component } from 'react'
// 传值类型校验
import PropTypes from 'prop-types'
class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    const { content } = this.props
    return (
      <div onClick={ this.handleClick }>{ content }</div>
    )
  }
  // 组件是否更新，如果传进来的值跟之前的一样，就不进行更新，
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.content !== this.props.content) {
      return true
    }
    return false
  }
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }
  handleClick() {
    const { deleteItem, index } = this.props
    deleteItem(index)
  }
}
// 类型
TodoItem.propTypes = {
  // content 是一个string类型的
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number.isRequired,
  // test 有可能是number，有可能是string类型
  // test: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

// 默认属性
TodoItem.defaultProps = {
  // 设置content默认为空字符串
  content: ''
}
export default TodoItem