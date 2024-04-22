import { atom } from "recoil";

export const inputState = atom({
  key: 'inputState', // unique ID (with respect to other atoms/selectors)
  default: 'Toronto',// default value (aka initial value)
});
