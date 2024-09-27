// import { Room } from "@/app/Room";
"use client";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { Room } from "./Room";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (roomId) {
      // Navigate to the dynamic route based on roomId
      console.log("roomId", JSON.stringify(roomId, null, 2));
      router.push(`/enter-name?roomId=${roomId}`);
    }
  };
  return (
    <div className="flex bg-black z-50">
      <h1>Right Panel</h1>
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
          sx={{ width: 300 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Go to Room
        </Button>
      </Box>
    </div>
  );
}
