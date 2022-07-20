import { atom } from "recoil";

export type TUser = {
  role: string;
  userStatus: string;
};

export const userState = atom<TUser>({
  key: "userState",
  default: {
    role: "",
    userStatus: "",
  },
});
