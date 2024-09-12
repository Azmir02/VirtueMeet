import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import firebaseConfig from "./Db/firebaseConfig.js";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./features/Store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
