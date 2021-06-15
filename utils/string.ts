import { SENIOR, VALID_NAMES } from './constants';

export const firstName = (s: string, setLowerCase = true): string =>
  setLowerCase ? s.toLowerCase().split(' ')[0] : s.split(' ')[0];

export const toFirstNames = (arr: string[], setLowerCase = true): string[] =>
  arr.map(name => firstName(name, setLowerCase));

export const validateNames = (arr: string[]): string[] =>
  arr.filter(name => VALID_NAMES.includes(name as SENIOR));

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);