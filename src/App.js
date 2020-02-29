/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-20 10:42:14
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-29 11:46:52
 */
import React, { Component, Fragment } from 'react'
import './style.css'
// 动画组件
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      list: []
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
  }
  render() {
    return (
      // <Fragment>
      //   <CSSTransition
      //     in = { this.state.show }
      //     timeout = { 1000 }
      //     classNames = 'fade'
      //     // unmountOnExit 不显示的时候之间移除dom
      //     unmountOnExit
      //     onEntered = { (el) => {
      //       el.style.color = 'blue'
      //     }}
      //     appear = { true }
      //   >
      //     <div>hello</div>
      //   </CSSTransition>
      //   <button onClick = { this.handleToggle }>toggle</button>
      // </Fragment>
      <Fragment>
        <TransitionGroup>
          {
            this.state.list.map((item, index) => {
              return (
                <CSSTransition
                  key={ index }
                  timeout = { 1000 }
                  classNames = 'fade'
                  // unmountOnExit 不显示的时候之间移除dom
                  unmountOnExit
                  onEntered = { (el) => {
                    el.style.color = 'blue'
                  }}
                  appear = { true }
                >
                  <div>{ item }</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick = { this.handleAddItem }>toggle</button>
      </Fragment>
    )
  }
  handleToggle() {
    this.setState(() => {
      return {
        show: this.state.show ? false : true
      }
    })
  }
  handleAddItem() {
    this.setState((prevState) => {
      return {
        list: [...prevState.list, 'item']
      }
    })
  }
}
export default App
