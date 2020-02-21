<!--
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-21 15:58:13
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-21 19:40:54
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

