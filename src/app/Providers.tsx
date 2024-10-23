"use client";

import { useGlobalState } from "@/store";
import { LiveblocksProvider } from "@liveblocks/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type PropsWithChildren } from "react";
const queryClient = new QueryClient();
export function Providers({ children }: PropsWithChildren) {
  const { currentRoomId } = useGlobalState();
  console.log("currentRoomId", JSON.stringify(currentRoomId, null, 2));
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (currentRoomId) {
      console.log("currentRoomId updated:", currentRoomId);
      setIsReady(true); // Enable rendering only when currentRoomId is available
    }
  }, [currentRoomId]);

  // if (!isReady) {
  //   // Render a loader or nothing until the room ID is available
  //   return <div>Loading...</div>;
  // }
  return (
    <QueryClientProvider client={queryClient}>
      <LiveblocksProvider
        authEndpoint={`/api/liveblocks-auth?roomId=${currentRoomId}`}
      >
        {children}
      </LiveblocksProvider>
    </QueryClientProvider>
  );
}
