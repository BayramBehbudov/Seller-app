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
import { braSizes, letterSize, numSize } from "@/static/filters/sizes";
import { ISubCategoryValue } from "@/types/interfaces";

export const underwear: ISubCategoryValue = {
  title: "Alt paltarı",
  filters: [],
  features: [
    { title: "matereal", value: matereal },
    { title: "liningOptions", value: liningOptions },
    { title: "pocketOptions", value: pocketOptions },
    { title: "patterns", value: patterns },
    { title: "closureTypes", value: closureTypes },
  ],
  child: {
    night: {
      title: "Gecəlik",
      filters: [
        {
          title: "size",
          value: [
            ...letterSize,
            ...numSize.slice(34, 50),
            "Oversize",
            "Standart",
          ],
        },
      ],
      features: [
        { title: "hoodOptions", value: hoodOptions },
        { title: "collarTypes", value: collarTypes },
        { title: "sleeveLength", value: sleeveLength },
        { title: "forma", value: forma.slice(0, 9) },
      ],
    },
    bra: {
      title: "Büstqalter",
      filters: [
        {
          title: "size",
          value: [...letterSize, ...braSizes, "Standart"],
        },
      ],
      features: [{ title: "collarTypes", value: collarTypes }],
    },
    set: {
      title: "Dəst",
      filters: [],
      features: [],
    },
  },
};
