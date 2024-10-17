import { axiosBridged } from "@/utils/network";
import toast from "react-hot-toast";

export const registerUser = async (data: any) => {
  try {
    const resp = await axiosBridged.post("/auth/register", data);
    console.log(resp);
    return resp;
  } catch (error: any) {
    console.log("error in Register-->", error);
    toast.error(error.response.data.message);
    throw error;
  }
};

export const login = async (data: any) => {
  try {
    const resp = await axiosBridged.post("/auth/login", data);
    return resp;
  } catch (error) {
    console.log("error in Login-->", error);
    throw error;
  }
};
