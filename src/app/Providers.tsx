"use client";

import { LiveblocksProvider } from "@liveblocks/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
const queryClient = new QueryClient();
export function Providers({ children }: PropsWithChildren) {
  // Try changing the lostConnectionTimeout value to increase
  // or reduct the time it takes to reconnect
  return (
    <QueryClientProvider client={queryClient}>
      <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
        {children}
      </LiveblocksProvider>
    </QueryClientProvider>
  );
}
