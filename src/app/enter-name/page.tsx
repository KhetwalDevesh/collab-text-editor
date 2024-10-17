"use client";
import { useSearchParams, useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/store";
import { addUserToRoom } from "../api/room";

export default function EnterNamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userName, userId } = useGlobalState();

  // Get the roomId from the query parameters
  const roomId = searchParams.get("roomId");
  const [guestUsername, setGuestUsername] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (guestUsername && roomId) {
      // Store the username in sessionStorage or localStorage
      // Redirect to the room page with the roomId
      console.log("handleSubmit called");
      addUserToRoom(roomId, userId, guestUsername);
      router.push(`/${roomId}`);
    }
  };

  return (
    <div>
      <h1>Enter Your Name</h1>
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
          label="Enter Your Name"
          variant="outlined"
          value={guestUsername}
          onChange={(e) => setGuestUsername(e.target.value)}
          sx={{ width: 300 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Go to Room
        </Button>
      </Box>
    </div>
  );
}
