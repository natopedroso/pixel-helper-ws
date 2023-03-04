import texts from "./locales/enus.json";
type Texts = keyof typeof texts;
export type Translater = {
  [key in Texts]?: string;
};
