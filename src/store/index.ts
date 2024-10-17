import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GlobalStateProps {
  authToken: string | null;
  userId: string | null;
  userName: string | null;
  userAvatar: string | null;
  currentRoomId: string | null;
}

const INITIAL_STATE = {
  authToken: null,
  userId: null,
  userName: null,
  userAvatar: null,
  currentRoomId: null,
};

const useUserStore = create<GlobalStateProps>()(
  devtools(
    persist(
      (set, get) => ({
        ...INITIAL_STATE,
      }),
      {
        name: "collab-text-editor-base",
      }
    )
  )
);

export const useGlobalState = useUserStore;

export const resetGlobalState = () => {
  try {
    useUserStore.setState({ ...INITIAL_STATE });
  } catch (error) {
    console.log("error in resetGlobalState-->", error);
  }
};

export const getAuthToken = () => {
  return useUserStore.getState().authToken;
};

export const setGlobalState = (data: any) => {
  try {
    useUserStore.setState({
      ...useUserStore.getState(),
      ...data,
    });
  } catch (error) {
    console.log(error);
  }
};
