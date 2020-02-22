<!--
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-21 15:58:13
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-22 11:20:29
 -->
1. Fragment 类似 Vue 中的 template 一样的作用：

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

2. react中定义数据要放在状态之中

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

3. input 绑定数值：

```js
// 数据就是上面代码定义的，跟Vue类似
<input value={ this.state.inputValue }/>
```

4. 绑定事件：onChange

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

5. 改变状态中的值：跟 vue 还是有很大的区别：

```js
  this.setState({
    inputValue: e.target.value
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

6. for 循环：跟Vue还是有很大的区别
```js
        <ul>
          {
            this.state.list.map((item, index) => {
            return <li key={ index }>{ item }</li>
            })
          }
        </ul>
```

7. class的样式添加：

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

8. 与Vue中 v-html指令类似的：dangerouslySetInnerHTML

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

9. 如果需要点击一个label标签，然后input获取输入焦点，可以这样写：
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

10. 组件之间的传值

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