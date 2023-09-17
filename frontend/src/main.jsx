import React from "react";
import ReactDOM from "react-dom/client";
import { PhrasesProvider } from "./contexts/phrasesContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PhrasesProvider>
      <App />
    </PhrasesProvider>
  </React.StrictMode>
);
