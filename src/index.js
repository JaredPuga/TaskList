import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { TaskProvider } from './context/TaskContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={"dev-5acexk4m3jsah17y.us.auth0.com"}
      clientId={"yEVNsWKwjV3WTSvmeSckqy8oI64eRGm7"}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
    <TaskProvider>
      <App />
    </TaskProvider>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();