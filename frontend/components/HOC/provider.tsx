"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StoreProvider from "./StoreProvider";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <div>{children}</div>
          <ReactQueryDevtools initialIsOpen={false} />
        </StoreProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Provider;
