import { VALID_NAMES } from "./constants";

export const firstName = (s: string, setLowerCase = true) =>
  setLowerCase ? s.toLowerCase().split(' ')[0] : s.split(' ')[0];

export const toFirstNames = (arr: string[], setLowerCase = true) =>
  arr.map(name => firstName(name, setLowerCase));

export const validateNames = (arr: string[]) =>
  arr.filter(name => VALID_NAMES.includes(name));