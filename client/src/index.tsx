import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Dashboard from './pages/Dashboard';
import { io } from 'socket.io-client';
import { socket, SocketProvider } from './context/socket';

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
