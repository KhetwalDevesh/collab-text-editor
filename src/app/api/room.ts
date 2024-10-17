import { axiosBridged } from "@/utils/network";

export const createNewRoom = async () => {
  try {
    const resp = await axiosBridged.post("/room");
    console.log(resp.data);
    return resp.data.newRoom;
  } catch (error) {
    console.log("error in createNewRoom", error);
    throw error;
  }
};

export const getRoomDetails = async (roomId: string) => {
  try {
    const resp = await axiosBridged.get(`/room/${roomId}`);
    console.log("resp", JSON.stringify(resp, null, 2));
    return resp.data;
  } catch (error) {
    console.log("error in getRoomDetails", error);
    throw error;
  }
};

export const addUserToRoom = async (
  roomId: string,
  userId: string | null,
  username: string
) => {
  try {
    const resp = await axiosBridged.put(`/room/${roomId}/users`, {
      hostId: userId,
      username: username,
    });
    console.log(resp);
  } catch (error) {
    console.log("error in addUserToRoom", error);
    throw error;
  }
};
