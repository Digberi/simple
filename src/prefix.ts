import { environment } from "./environment";

export const { prefix } = environment;
export const addPrefix = (value: string) => `${prefix}${value}`;
export const removePrefix = (value: string) => value.replace(prefix, '');
export const hasPrefix = (value: string) => value.startsWith(prefix);