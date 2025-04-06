
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store"; // <-- import persistor
import { PersistGate } from "redux-persist/integration/react"; // <-- import PersistGate
import SessionLoader from "./components/sessionLoader";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionLoader> {/* Wrap App here */}
          <App />
        </SessionLoader>
      </PersistGate>
    </Provider>
  </StrictMode>
);
