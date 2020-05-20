import React from 'react';
import '../styles/App.css';
import { Provider } from 'react-redux'
import store from '../redux/store'
import TodoList from './TodoList'

export default () => <div className="App">
  <Provider store={store}>
    <TodoList />
  </Provider>
</div>
