import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TypingSpeedContextProvider } from "./context/typingSpeed.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TypingSpeedContextProvider>
      <App />
    </TypingSpeedContextProvider>
  </StrictMode>
);
