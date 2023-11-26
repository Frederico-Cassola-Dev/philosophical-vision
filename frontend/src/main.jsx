import React from "react";
import ReactDOM from "react-dom/client";
import { PhrasesProvider } from "./contexts/phrasesContext";
import { UserProvider } from "./contexts/userContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <PhrasesProvider>
        <App />
      </PhrasesProvider>
    </UserProvider>
  </React.StrictMode>
);
