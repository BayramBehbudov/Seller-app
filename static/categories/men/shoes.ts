import { closureTypes, matereal, patterns } from "@/static/feautures/global";
import { heelHeight, soleType } from "@/static/feautures/shoe";
import { numSize } from "@/static/filters/sizes";
import { ISubCategoryValue } from "@/types/interfaces";

export const shoes: ISubCategoryValue = {
  title: "Ayaqqabı",
  filters: [{ title: "size", value: numSize.slice(36, 47) }],
  features: [
    { title: "shoeMatereal", value: matereal },
    { title: "closureTypes", value: closureTypes },
    { title: "soleType", value: soleType },
    { title: "heelHeight", value: heelHeight },
    { title: "patterns", value: patterns },
    { title: "entryMatereal", value: matereal },
  ],
  child: {
    sport: {
      title: "İdman ayaqqabısı",
      filters: [],
      features: [],
    },
    sneaker: {
      title: "Sneaker",
      filters: [],
      features: [],
    },
    classicShoe: {
      title: "Klassik ayaqqabı",
      filters: [],
      features: [],
    },
    boots: {
      title: "Çəkmə",
      filters: [],
      features: [],
    },
    daily: {
      title: "Gündəlik",
      filters: [],
      features: [],
    },
    krossovka: {
      title: "Krossovka",
      filters: [],
      features: [],
    },
  },
};
