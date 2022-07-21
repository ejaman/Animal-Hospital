import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom }: any = recoilPersist({
  key: "hospitalLoginState",
});

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
  effects_UNSTABLE: [persistAtom],
});
