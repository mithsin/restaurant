import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import UserStatusProvider from 'PageRouter/UserStatusProvider';
import { ThemeProvider } from 'react-jss'
import store from 'Store/store';
import { Provider } from 'react-redux';
import './index.css';
import { theme } from 'StaticDatas/themeColor';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <UserStatusProvider>
          <Router>
            <App />
          </Router>
        </UserStatusProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
