import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import LinksContextProvider from "./contexts/links";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <LinksContextProvider>
      <App />
    </LinksContextProvider>
  </React.StrictMode>
);
