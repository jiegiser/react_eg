/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-04 11:58:19
 * @LastEditors: jiegiser
 * @LastEditTime: 2020-02-21 15:46:54
 */
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';

// pwa技术
import * as serviceWorker from './serviceWorker';
// 使用jsx语法就必须引用react
ReactDOM.render(<TodoList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
