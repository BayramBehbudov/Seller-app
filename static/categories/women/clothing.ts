import {
  collarTypes,
  forma,
  hoodOptions,
  liningOptions,
  ortam,
  pocketOptions,
  sleeveLength,
} from "@/static/feautures/clothings";
import { closureTypes, matereal, patterns } from "@/static/feautures/global";
import { letterSize, numSize } from "@/static/filters/sizes";
import { ISubCategoryValue } from "@/types/interfaces";

export const clothing: ISubCategoryValue = {
  title: "Geyim",
  filters: [
    {
      title: "size",
      value: [...letterSize, ...numSize.slice(34, 50), "standart"],
    },
  ],
  features: [
    { title: "liningOptions", value: liningOptions },
    { title: "pocketOptions", value: pocketOptions },
    { title: "patterns", value: patterns },
    { title: "matereal", value: matereal },
    { title: "closureTypes", value: closureTypes },
    { title: "ortam", value: ortam },
  ],
  child: {
    tshirts: {
      title: "T-Shirt",
      filters: [],
      features: [
        { title: "hoodOptions", value: hoodOptions },
        { title: "collarTypes", value: collarTypes },
        { title: "forma", value: forma.slice(0, 9) },
        { title: "sleeveLength", value: sleeveLength },
      ],
    },
    shirts: {
      title: "Köynək",
      filters: [],
      features: [
        { title: "hoodOptions", value: hoodOptions },
        { title: "forma", value: forma.slice(0, 9) },
        { title: "sleeveLength", value: sleeveLength },
        { title: "collarTypes", value: collarTypes },
      ],
    },
    shorts: { title: "Şort", filters: [], features: [] },
    pants: {
      title: "Şalvar",
      filters: [],
      features: [],
    },

    jackets: {
      title: "Pencək",
      filters: [],
      features: [
        { title: "sleeveLength", value: sleeveLength },
        { title: "collarTypes", value: collarTypes },
        { title: "hoodOptions", value: hoodOptions },
      ],
    },
    sviter: {
      title: "Sviter",
      filters: [],
      features: [
        { title: "collarTypes", value: collarTypes },
        { title: "sleeveLength", value: sleeveLength },
        { title: "hoodOptions", value: hoodOptions },
      ],
    },
    suits: {
      title: "Kostyum",
      filters: [],
      features: [
        { title: "collarTypes", value: collarTypes },
        { title: "sleeveLength", value: sleeveLength },
      ],
    },
    coats: {
      title: "Palto/Gödəkçə",
      filters: [],
      features: [
        { title: "collarTypes", value: collarTypes },
        { title: "sleeveLength", value: sleeveLength },
      ],
    },
    dresses: { title: "Don", filters: [], features: [] },
    blouses: { title: "Bluz", filters: [], features: [] },
    skirts: {
      title: "Ətək",
      filters: [],
      features: [{ title: "forma", value: forma }],
    },
  },
};
