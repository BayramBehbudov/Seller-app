import { ISubCategoryValue } from "@/types/interfaces";
import { numSize } from "../../filters/sizes";
import { closureTypes, matereal, patterns } from "../../feautures/global";
import { heelHeight, soleType } from "../../feautures/shoe";

export const shoes: ISubCategoryValue = {
  title: "Ayaqqabı",
  filters: [{ title: "size", value: numSize.slice(20, 45) }],
  features: [
    { title: "shoeMatereal", value: matereal },
    { title: "closureTypes", value: closureTypes },
    { title: "soleType", value: soleType },
    { title: "heelHeight", value: heelHeight },
    { title: "patterns", value: patterns },
    { title: "entryMatereal", value: matereal },
  ],
  child: {
    heel: {
      title: "Dikdaban ayaqqabı",
      filters: [],
      features: [],
    },
    sneaker: {
      title: "Sneaker",
      filters: [],
      features: [],
    },

    daily: {
      title: "Gündəlik",
      filters: [],
      features: [],
    },
    babet: {
      title: "Babet",
      filters: [],
      features: [],
    },
    sandal: {
      title: "Sandal",
      filters: [],
      features: [],
    },

    boot: {
      title: "Çəkmə",
      filters: [],
      features: [],
    },
  },
};
