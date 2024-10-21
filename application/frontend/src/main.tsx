import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import App from './App.tsx';
import { routeTree } from "./routeTree.gen";
import { OpenAPI } from "./client";
import theme from "./theme";

OpenAPI.BASE = import.meta.env.VITE_API_URL;
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || "";
};

const queryClient = new QueryClient();

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
);