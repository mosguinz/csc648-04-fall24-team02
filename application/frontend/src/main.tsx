import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import App from './App.tsx'; // Import your App component
import { routeTree } from "./routeTree.gen"; // Import your route tree
import { OpenAPI } from "./client"; // Import OpenAPI client
import theme from "./theme"; // Import Chakra UI theme

// OpenAPI Configuration
OpenAPI.BASE = import.meta.env.VITE_API_URL;
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || "";
};

// QueryClient setup for React Query
const queryClient = new QueryClient();

// Create Router
const router = createRouter({ routeTree });

// TypeScript declaration for router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the root element with all necessary providers
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <App /> {/* App component wrapped inside RouterProvider */}
        </RouterProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
);