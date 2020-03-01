<!--
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-21 15:58:13
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-03-01 09:41:08
 -->
## Fragment 类似 Vue 中的 template 一样的作用

```js
import React, { Component, Fragment } from 'react'

class TodoList extends Component {
  render () {
    return (
      <Fragment>
        <div>
          <input />
          <button>提交</button>
        </div>
        <ul>
          <li>英语</li>
          <li>learning react</li>
        </ul>
      </Fragment>
    )
  }
}
export default TodoList
```

## react中定义数据要放在状态之中

```js
import React, { Component, Fragment } from 'react'

class TodoList extends Component {
  constructor(props) {
    // 组件继承
    super(props)
    // react中定义数据要放在状态之中
    this.state = {
      inputValue: '',
      list: []
    }
  }
  render () {
    return (
      <Fragment>

      </Fragment>
    )
  }
}
export default TodoList
```

## input 绑定数值

```js
// 数据就是上面代码定义的，跟Vue类似
<input value={ this.state.inputValue }/>
```

## 绑定事件：onChange

```js
  render () {
    return (
      <Fragment>
        <div>
          <input value = { this.state.inputValue }
            onChange = { this.handleInputChange }
          />
          <button>提交</button>
        </div>
        <ul>
          <li>英语</li>
          <li>learning react</li>
        </ul>
      </Fragment>
    )
  }
```

绑定点击事件，都跟原生的差不多，`onClick`:
```js

```

## 改变状态中的值：跟 vue 还是有很大的区别：

```js
  this.setState({
    inputValue: e.target.value
  })
```
setState方法也可以写成一个返回异步的函数：
```js
    // 写成函数的形式是异步返回的
    const inputValue = e.target.value
    this.setState(() => {
      return {
        inputValue
      }
    })
```

如果需要在组件的方法中使用this。需要在html绑定方法的时候绑定this：

```js
  render () {
    return (
      <Fragment>
        <div>
          <input value = { this.state.inputValue }
            onChange = { this.handleInputChange.bind(this) }
          />
          <button>提交</button>
        </div>
      </Fragment>
    )
  }
```

## for 循环：跟Vue的 v-for 还是有很大的区别
```js
        <ul>
          {
            this.state.list.map((item, index) => {
            return <li key={ index }>{ item }</li>
            })
          }
        </ul>
```

## class的样式添加：

首先通过import引入样式，然后进行绑定样式，注意这里是className进行绑定，为了防止跟class关键字重名：

```js
// 引入样式
import './style.css'
<div>
  { /*这是一个注释*/ }
  <input
    className = 'input'
    value = { this.state.inputValue }
    onChange = { this.handleInputChange.bind(this)
  }
/>
```

## 与Vue中 v-html指令类似的：dangerouslySetInnerHTML

```js
  return (
      <li 
          key={ index }
          onClick={ this.handleItemDelete.bind(this, index) }
          dangerouslySetInnerHTML = { { __html: item } }
      >
      </li>
    )
```

## 如果需要点击一个label标签，然后input获取输入焦点，可以这样写：
htmlFor要对应input的id

```js
 <div>
   <label htmlFor="insertArea">输入内容</label>
   { /*这是一个注释*/ }
   <input
     id="insertArea"
     className = 'input'
     value = { this.state.inputValue }
     onChange = { this.handleInputChange.bind(this)
   }
   />
   <button onClick = { this.handleBtnClick.bind(this) }>提交</button>
 </div>
```

## 组件之间的传值

父组件向子组件传值，跟vue类似，也是通过属性进行传值：
```js
// 父组件
  return (
    <div>
      <TodoItem content = { item }/>
      {
        /*
        <li 
          key={ index }
          onClick={ this.handleItemDelete.bind(this, index) }
          dangerouslySetInnerHTML = { { __html: item } }
        >
        </li>
       */
       }
    </div>
  )
// 子组件接收通过this.props
  render() {
    return (
    <div>{ this.props.content }</div>
    )
  }
```
子组件接收父组件传入的值进行校验，跟Vue还是存在很大的区别：
在子组件中首先需要引入prop-types包，
```js
// 传值类型校验
import PropTypes from 'prop-types'
// 类型
TodoItem.propTypes = {
  // content 是一个string类型的
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number,
  // 表示该值必须要传并为string类型
  test: PropTypes.string.isRequired,
  // test 有可能是number，有可能是string类型
  test: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
// 默认属性
TodoItem.defaultProps = {
  // 设置content默认为空字符串
  content: ''
}
```

子组件向父组件传值: 跟Vue还是有很大的区别，方法也是通过属性的形势进行传递：
```js
// 父组件
  <TodoItem
    content = { item }
    index = { index }
    deleteItem = { this.handleItemDelete.bind(this) }
  />
// 子组件
  handleClick() {
    // 直接通过下面的方式进行调用父组件的方法，
    // 注意这里其实就是调用this.handleItemDelete，
    // 需要在父组件进行绑定this，在父组件传值的时候需要记得绑定this
    this.props.deleteItem(this.props.index)
  }
```


## react 框架的特点
- 声明式的开发

  react 的开发方式是声明式的开发，以前jquery是命令式的开发，直接操作dom。
- 可以与其他框架并存

  react也可以与其他框架并存，因为他只是管理有关挂载点相关的dom渲染。react开发是组件化的开发。
- 单向数据流

  react中是单向数据流；父组件可以向子组件传值，但是子组件不能随意修改父组件的数据。
如果每个子组件都接收父组件的数据，然后每个子组件都修改数据，其他的组件数据全部就会发生改变。
一个数据被很多组件所公用；所以数据是单项数据流；如果必须修改可以父组件向子组件传递方法，
在子组件调用父组件的方法，在父组件中进行数据的改变，这样维护代码比较容易。

- 视图层框架

  非父子组件之间的通讯，按照之前的方法很是麻烦，类似Vue，有vuex进行管理数据。
react使用redux等进行管理数据

- 函数式编程

  维护比较容易，前端自动化测试的时候比较容易；只需要给函数输入值查看结果是否是正确的。

## 虚拟DOM

- state 数据
- JSX模板
- 数据 + 模板结合，生成真实的DOM，来显示
- state 发生改变
- 数据 + 模板，生成真实的DOM，替换原始的DOM

缺陷：
第一次生成了一个完整的DOM片段
第二次生成了一个完整的DOM片段
第二次生成的DOM完全替换第一次生成的DOM；非常消耗性能。

改良：
- state 数据
- JSX模板
- 数据 + 模板结合，生成真实的DOM，来显示
- state 发生改变
- 数据 + 模板，生成真实的DOM，并不直接替换原始的DOM
- 新的 DOM （DocumentFragment）和原始的 DOM 做比对，找差异。
- 找出 input 框发生了的变化
- 只用新的DOM中的input元素，替换掉老的DOM中的input元素

缺陷：
性能的提升并不明显

- state 数据
- JSX模板
- 数据 + 模板结合，生成真实的DOM，来显示

```html
  <div id='abc'><span>hello world</span></div>
```
- 生成虚拟 DOM （虚拟DOM就是一个JS对象，用它来描述真实DOM）

```js  
  ['div', { id: 'abc }, ['span', {}, 'hello world']]
```

- state 发生改变
- 数据 + 模板，生成新的虚拟 DOM，

```js  
  ['div', { id: 'abc }, ['span', {}, 'bye']]
```
- 比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是span中内容
- 直接操作DOM，改变span中的内容

react实现：

- state 数据
- JSX模板
- 数据 + 模板结合，生成虚拟的DOM
```js  
  ['div', { id: 'abc }, ['span', {}, 'hello world']]
```
- 用虚拟 DOM （虚拟DOM就是一个JS对象，用它来描述真实DOM）
生成真是的DOM，来显示
```html
  <div id='abc'><span>hello world</span></div>
```

- state 发生改变
- 数据 + 模板，生成新的虚拟 DOM，

```js  
  ['div', { id: 'abc }, ['span', {}, 'bye']]
```
- 比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是span中内容
- 直接操作DOM，改变span中的内容

我们写的JSX语法也可以使用createElement的方法来实现：
```js
    return (
      React.createElement('div', {}, 'item')
    )
```
虚拟DOM优点：

1. 性能提升了。
2. 他使得跨端应用得以实现：React Native

虚拟DOM中的Diff算法：

同层虚拟DOM的比对，如果第一层不一致，就直接替换他的所有的子的DOM。
如果我们渲染数组进行循环渲染，最好不要使用循环的index，因为比如a 0 b 1 c 2,
如果我们删除了a。那么b：0，c:1；会导致key不稳定，diff算法比较会进行重新渲染。


## React中ref的使用

ref获取元素对应的DOM；跟Vue是一样的，但是ref是一个函数：
```js
return (
          <input
            id="insertArea"
            className = 'input'
            value = { this.state.inputValue }
            onChange = { this.handleInputChange }
            ref={ (input) => { this.input = input } }
          />
        )
  handleInputChange(e) {
    // 写成函数的形式是异步返回的
    // const inputValue = e.target.value
    // this.input指向的是实际的input的DOM元素
    const inputValue = this.input.value
    this.setState(() => {
      return {
        inputValue
      }
    })
  }
  // 尽量不使用ref进行操作dom。就跟我们在Vue中会使用$nextrick函数一样，setState更新数据是异步的。
  // 我们可以使用setState的第二个函数，里面进行获取数值，没有类似$nextrick函数：
  handleInputChange(e) {
    const inputValue = this.input.value
    this.setState(() => {
      return {
        inputValue
      }
    }, () => {
      console.log(this.ul.querySelectorAll('div').length)
    })
  }
```

## React中声明周期函数

初始化：constructor
Mounting：挂载数据。componentWillMount、render、componentDidCatch
Updation：数据更新
  包括组件更新以及states更新：
  props独有的：componentWillReceiveProps
  1. shouldComponentUpdate
  2. componentWillUpdate
  3. render
  4. componentDidUpdate

Unmounting：把组件从页面去除的过程
componentWillUnmount

```js
  // 在组件即将被挂载到页面的时刻自动执行--类似Vue的beforeMounted
  componentWillMount() {
    console.log('componentWillMount')
  }
  // 组件被挂在到页面之后，自动被执行 --Vue的mounted函数
  // 一般ajax请求放在这里
  componentDidMount() {
    console.log('componentDidMount')
  }
  // 组件被更新之前，他会自动被执行，
  shouldComponentUpdate() {
    // 需要返回一个bool类型，组件数据是否被更新
    console.log('shouldComponentUpdate')
    return true
  }
  // 组件被更新之前，他会自动执行，vue的beforeUpdated ，但是他在shouldComponentUpdate之后
  // 执行，如果shouldComponentUpdate返回true才会执行，如果返回false，就不会被执行
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  // 组件更新完成之后，他会被执行
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  // 当一个组件从父组件接收参数
  // 只要父组件的render函数被重新执行了，子组件的这个声明周期就会被执行
  // 如果这个组件第一次存在于父组件中，不会执行
  // 如果这个组件之前已经存在于父组件中，才会执行。
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }
  // 当这个组件即将被从页面中剔除的时候，会被执行
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
```
生命周期函数的使用场景：

提升性能：
比如我们做的todolist，当input输入框中输入的数据没有添加到数组中，也就是要
传递给子组件中，就不让他生成虚拟dom进行渲染（如果不进行控制，每次在input输入值的时候，会执行子组件的render重新渲染）
可以进行判断传值的变化，进行减少性能消耗。
```js
  // 组件是否更新，如果传进来的值跟之前的一样，就不进行更新，
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.content !== this.props.content) {
      return true
    }
    return false
  }
```

## React中动画

使用css动画效果：
```css
.show {
  opacity: 1;
  transition: all 1s ease-in;
}

.hide {
  opacity: 0;
  transition: all 1s ease-in;
}
```
或者定义动画：

```css
.show {
  animation: show-item 2s forwards;
}

/* 定义 hide-item的动画，持续两秒，ease-in动画曲线，forwards就是最终保留动画的最后效果，不要去除*/
.hide {
  animation: hide-item 2s forwards;
}

@keyframes show-item {
  0% {
    opacity: 0;
    color: red;
  }
  50% {
    opacity: 0.5;
    color: green;
  }
  100% {
    opacity: 1;
    color: blue;
  }
}
@keyframes hide-item {
  0% {
    opacity: 1;
    color: red;
  }
  50% {
    opacity: 0.5;
    color: green;
  }
  100% {
    opacity: 0;
    color: blue;
  }
}
```

使用 react-transition-group 实现动画

> https://github.com/reactjs/react-transition-group
  https://reactcommunity.org/react-transition-group/

使用这个库就跟Vue的动画组件一样，有几个类进行控制动画：
```css
.fade-enter, .fade-appear {
  opacity: 0;
}
.fade-enter-active, .fade-appear-active  {
  opacity: 1;
  transition: opacity 1s ease-in;
}
.fade-enter-done {
  opacity: 1;
}
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: opacity 1s ease-in;
}
.fade-exit-done {
  opacity: 0;
}
```
在元素标签上，需要进行设置：其中onEntered是当动画执行完成之后执行的钩子函数，我们也可以
在fade-enter-done的类中添加color属性，跟onEntered里面设置是一样的
```html
        <CSSTransition
          // 根据什么属性进行变化
          in = { this.state.show }
          timeout = { 1000 }
          classNames = 'fade'
          // unmountOnExit 不显示的时候之间移除dom
          unmountOnExit
          onEntered = { (el) => {
            el.style.color = 'blue'
          }}
          // 页面在第一次渲染的时候执行动画,会给元素增加fade-appear以及fade-appear-active两个类
          appear = { true }
        >
          <div>hello</div>
        </CSSTransition>
```

使用 react-transition-group 实现多个元素的动画

首先需要引入TransitionGroup：跟单个不同的是，需要在每一个循环的元素外层包裹一个CSSTransition。
```js
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
```

## 子组件调用父组件的方法并传递参数

上面只是写了父组件可以像其他数据一样传递函数给子组件，但是没有像父组件的方法中传递
参数，如果我们这样写：this.props.handleItemDelete(index) 直接传入index是不行的；
```js
// 错误的写法
        <List
          renderItem = { (item, index) => (
            <List.Item
              onClick = { this.props.handleItemDelete(index) }
            >
              { item }
            </List.Item>
          )}
        />
// 正确的写法
        <List
          renderItem = { (item, index) => (
            <List.Item
              onClick = { (index) => {
                this.props.handleItemDelete(index)
              } }
            >
              { item }
            </List.Item>
          )}
        />
```

## 无状态组件

当一个组件只有render函数的时候，我们可以使用无状态组件来替换，例如：
```js
 import React, { Component } from 'react'
 import { Input, Button, List } from 'antd'
 class TodoListUI extends Component {
   render() {
     return (
      <div style = {{ marginTop: '10px', marginLeft: '10px' }}>
        <div>
          <Input
            value = { this.props.inputValue }
            placeholder="Basic usage"
            style = {{ width: '300px', marginRight: '10px'}}
            onChange = { this.props.handleInputChange }
          />
          <Button
            type="primary"
            onClick = { this.props.handleBtnClick }
          >提交</Button>
        </div>
        <List
          style = {{ marginTop: '10px', width: '300px' }}
          bordered
          dataSource = { this.props.list }
          renderItem = { (item, index) => (
            <List.Item
              onClick = { (index) => {
                this.props.handleItemDelete(index)
              } }
            >
              { item }
            </List.Item>
          )}
        />
      </div>
     )
   }
 }
 export default TodoListUI
```
我们可以用无状态组件来写：
```js
 import React from 'react'
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
          onClick = { (index) => {
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
```
无状态组件的性能比较高；因为他就是一个函数，只有render的组件是一个类，有声明周期函数等，
使用无状态组件来提高性能。