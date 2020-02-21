<!--
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-21 15:37:45
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-21 15:51:02
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