"use client";
import { useSearchParams, useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";

export default function EnterNamePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the roomId from the query parameters
  const roomId = searchParams.get("roomId");
  const [username, setUsername] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username && roomId) {
      // Store the username in sessionStorage or localStorage
      sessionStorage.setItem("username", username);

      // Redirect to the room page with the roomId
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ width: 300 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Go to Room
        </Button>
      </Box>
    </div>
  );
}
