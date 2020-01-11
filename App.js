import React,{Component} from 'react';
import Login from './src/pages/Login/Login/'
import Router from './src/pages/Router'
import store from './src/store'
import {Provider} from 'mobx-react';
const App: () => React$Node = () => {
  return (
    <>
    <Provider {...store}>
      <Router/>
      </Provider>
    </>
  );
};

export default App;
