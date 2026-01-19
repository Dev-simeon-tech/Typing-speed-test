import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TypingSpeedContextProvider from "./providers/typingSpeedProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TypingSpeedContextProvider>
      <App />
    </TypingSpeedContextProvider>
  </StrictMode>
);
