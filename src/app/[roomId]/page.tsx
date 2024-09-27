"use client";
import { useParams } from "next/navigation";
import { Room } from "../Room";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { Button } from "@mui/material";

export default function DynamicPage() {
  const { roomId: id } = useParams(); // `id` will hold the dynamic value from the URL (e.g., 1, 2, 3)

  return (
    <div>
      <h1>Room with ID: {id}</h1>
      <main>
        <Room roomId={id as string}>
          <CollaborativeEditor />
        </Room>
      </main>
    </div>
  );
}
