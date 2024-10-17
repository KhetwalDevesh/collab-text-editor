"use client";
import { useParams, useRouter } from "next/navigation";
import { Room } from "../Room";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { Button } from "@mui/material";
import { useGlobalState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { addUserToRoom, getRoomDetails } from "../api/room";

export default function DynamicPage() {
  const { roomId } = useParams(); // `id` will hold the dynamic value from the URL (e.g., 1, 2, 3)
  const { currentRoomId, userName, userId } = useGlobalState();
  const router = useRouter();

  // Ensure roomId is always a string
  const normalizedRoomId = Array.isArray(roomId) ? roomId[0] : roomId;

  const {
    data: currentRoomData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoomDetails(normalizedRoomId),
  });
  console.log("currentRoomData", JSON.stringify(currentRoomData, null, 2));
  if (!currentRoomData?.isRoomActive) {
    return <div>Invalid Room ID</div>;
  }
  if (!userName) {
    router.push(`/enter-name?roomId=${roomId}`);
  }

  if (userName) {
    addUserToRoom(normalizedRoomId, userId, userName);
  }

  return (
    <div>
      <h1>Room with ID: {roomId}</h1>
      <h1>{userName}</h1>
      <main>
        <Room roomId={roomId as string}>
          <CollaborativeEditor />
        </Room>
      </main>
    </div>
  );
}
