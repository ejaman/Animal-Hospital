import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom }: any = recoilPersist({
  key: "hospitalLoginState",
});

export type THospital = {
  hospitalName: string;
  hospitalState: string;
};

export const hospitalLoginState = atom<THospital>({
  key: "hospitalLoginState",
  default: {
    hospitalName: "",
    hospitalState: "",
  },
  effects_UNSTABLE: [persistAtom],
});
