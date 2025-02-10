"use client";
import App from "./app";
import { ToastContextProvider } from "./context/use-toast";

export default function Home() {
  return (
    <ToastContextProvider>
      <App />
    </ToastContextProvider>
  );
}
