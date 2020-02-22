<!--
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-21 15:37:45
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-22 10:09:19
 -->
1. 不需要引号来包裹html标签。

```js
class App extends Component {
  render() {
    return (
      <div>
        hello 
      </div>
    )
  }
}
```
2. 组件名必须以大写开头

```js
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
```

3. render返回的内容外层必须有一个包裹的元素，跟vue一样

4. jsx写注释

```js
  render () {
    return (
      <Fragment>
        <div>
          { 
            /*这是一个注释*/
            // 单行注释   
          }
          <input value = { this.state.inputValue }
            onChange = { this.handleInputChange.bind(this) }
          />
        </div>
      </Fragment>
    )
  }
```