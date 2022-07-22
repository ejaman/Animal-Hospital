import { atom } from "recoil";

export const reservationState = atom<any>({
  key: "reservationState",
  default: {
    hospName: "",
    service: "",
    price: 0,
    pet: "",
    rezDate: "",
    rezHour: 0,
  },
});
