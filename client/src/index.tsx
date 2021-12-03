import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { socket, SocketProvider } from './context/socket';
import Dashboard from './pages/Dashboard';
import * as serviceWorker from './serviceWorker';
import { store } from './store/store';
axios.defaults.baseURL = 'http://localhost:5000';


ReactDOM.render(
  <React.StrictMode>
    <SocketProvider value={socket}>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
