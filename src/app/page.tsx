// import { Room } from "@/app/Room";
"use client";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { Room } from "./Room";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "@/store";
import { addUserToRoom, createNewRoom } from "./api/room";

function useCreateRoom() {
  return useQuery({
    queryKey: ["create-room"],
    queryFn: createNewRoom,
  });
}

export default function Home() {
  const { userId, userName } = useGlobalState();
  const [roomId, setRoomId] = useState("");
  const [loggedIn, setLoggedIn] = useState<boolean>(userId ? true : false);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (roomId) {
      // Navigate to the dynamic route based on roomId
      console.log("roomId", JSON.stringify(roomId, null, 2));
      setGlobalState({ currentRoomId: roomId });
      router.push(`/enter-name?roomId=${roomId}`);
    }
  };
  console.log("userId", JSON.stringify(userId, null, 2));
  console.log("loggedIn", JSON.stringify(loggedIn, null, 2));
  const startNewRoom = async () => {
    console.log("clicked start new room");
    try {
      const response = await createNewRoom(); // Wait for the API response
      console.log("response", JSON.stringify(response, null, 2));
      setGlobalState({ currentRoomId: response.id });
      if (userName) {
        console.log("addUser called from host");
        await addUserToRoom(response.id, userId, userName);
      }
      router.push(response.id);
    } catch (error) {
      console.error("Error creating new room:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      setLoggedIn(true);
    }
  }, [userId]);

  return (
    <div className="">
      <h1>Right Panel</h1>
      {loggedIn ? (
        <div className="border-2 flex justify-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "80px" }}
            onClick={() => startNewRoom()}
          >
            Start a new Room
          </Button>
        </div>
      ) : (
        <>Not loggedIn</>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          label="Enter Room ID"
          variant="outlined"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          sx={{ width: 300, marginTop: "220px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Go to Room
        </Button>
      </Box>
    </div>
  );
}
