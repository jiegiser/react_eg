/*
 * @Descripttion: 
 * @Author: jiegiser
 * @Date: 2020-02-04 11:58:19
 * @LastEditors  : jiegiser
 * @LastEditTime : 2020-02-04 13:06:49
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// pwa技术
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
