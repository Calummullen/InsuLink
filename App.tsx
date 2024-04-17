import * as React from "react";
import { AuthContextProvider } from "./context/auth-context";
import Index from "./components/Index";

export default function App() {
  return (
    <AuthContextProvider>
      <Index />
    </AuthContextProvider>
  );
}