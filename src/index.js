import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { TaskProvider } from "./context/TaskContext";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_URI}`,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH}`,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENTID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ApolloProvider client={client}>
        <TaskProvider>
          <App />
        </TaskProvider>
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
