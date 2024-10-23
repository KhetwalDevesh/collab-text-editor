// import { USER_INFO } from "@/app/[roomId]/page";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { getRoomDetails } from "../room";
import { useGlobalState } from "@/store";

/**
 * Authenticating your Liveblocks application
 * https://liveblocks.io/docs/authentication
 */
// console.log("USER_INFO", JSON.stringify(USER_INFO, null, 2));
// const { currentRoomId } = useGlobalState();
const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!,
});
console.log(process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY);
let session;

export async function POST(request: NextRequest) {
  console.log("inside POST request");
  console.log(request);
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");
  console.log("Received roomId:", roomId);
  const roomDetails = await getRoomDetails("room_WQwJOXDkoXr3Ve3");
  console.log("roomDetails", JSON.stringify(roomDetails, null, 2));
  const USER_INFO = roomDetails.users.map((name: string) => ({ name }));
  if (!USER_INFO) {
    return new Response(JSON.stringify({ error: "User info not available" }), {
      status: 400,
    });
  }
  // Get the current user's unique id from your database
  const userId = Math.floor(Math.random() * 10) % USER_INFO.length;
  console.log("USER_INFO", JSON.stringify(USER_INFO, null, 2));
  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  session = liveblocks.prepareSession(`user-${userId}`, {
    userInfo: USER_INFO[userId],
  });
  console.log("session", JSON.stringify(session, null, 2));
  // Use a naming pattern to allow access to rooms with a wildcard
  session.allow(`*`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  console.log("body", JSON.stringify(body, null, 2));
  console.log("status", JSON.stringify(status, null, 2));
  return new Response(body, { status });
}

console.log("session", JSON.stringify(session, null, 2));

// const USER_INFO = [
//   {
//     name: "Charlie Layne",
//     color: "#D583F0",
//     picture: "https://liveblocks.io/avatars/avatar-1.png",
//   },
//   {
//     name: "Mislav Abha",
//     color: "#F08385",
//     picture: "https://liveblocks.io/avatars/avatar-2.png",
//   },
//   {
//     name: "Tatum Paolo",
//     color: "#F0D885",
//     picture: "https://liveblocks.io/avatars/avatar-3.png",
//   },
//   {
//     name: "Anjali Wanda",
//     color: "#85EED6",
//     picture: "https://liveblocks.io/avatars/avatar-4.png",
//   },
//   {
//     name: "Jody Hekla",
//     color: "#85BBF0",
//     picture: "https://liveblocks.io/avatars/avatar-5.png",
//   },
//   {
//     name: "Emil Joyce",
//     color: "#8594F0",
//     picture: "https://liveblocks.io/avatars/avatar-6.png",
//   },
//   {
//     name: "Jory Quispe",
//     color: "#85DBF0",
//     picture: "https://liveblocks.io/avatars/avatar-7.png",
//   },
//   {
//     name: "Quinn Elton",
//     color: "#87EE85",
//     picture: "https://liveblocks.io/avatars/avatar-8.png",
//   },
// ];

// const LIVEBLOCKS_USER_INFO = USER_INFO;

// import { Liveblocks } from "@liveblocks/node";
// import { NextRequest } from "next/server";

// const liveblocks = new Liveblocks({
//   secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!,
// });

// let USER_INFO: Array<{ name: string }> = []; // Initialize USER_INFO

// export async function POST(request: NextRequest) {
//   console.log("Inside POST request");

//   if (!USER_INFO || USER_INFO.length === 0) {
//     return new Response(JSON.stringify({ error: "User info not available" }), {
//       status: 400,
//     });
//   }

//   try {
//     // Select a random user from the available USER_INFO
//     const userId = Math.floor(Math.random() * USER_INFO.length);
//     const userInfo = USER_INFO[userId];

//     // Create a session for the selected user
//     const session = liveblocks.prepareSession(`user-${userId}`, {
//       userInfo,
//     });

//     console.log("Session prepared:", JSON.stringify(session, null, 2));

//     // Allow full access to all rooms
//     session.allow(`*`, session.FULL_ACCESS);

//     // Authorize the user and return the result
//     const { body, status } = await session.authorize();
//     console.log("Body:", JSON.stringify(body, null, 2));
//     console.log("Status:", status);

//     return new Response(body, { status });
//   } catch (error) {
//     console.error("Error creating session:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//     });
//   }
// }
