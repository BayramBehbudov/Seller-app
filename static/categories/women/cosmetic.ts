import { formType, effectType, parfumType, skinType } from "@/static/feautures/skincare";
import { ISubCategoryValue } from "@/types/interfaces";

export const cosmetic: ISubCategoryValue = {
  title: "Dəriyə qulluq",
  filters: [],
  features: [
    {
      title: "skinType",
      value: skinType,
    },
    {
      title: "effectType",
      value: effectType,
    },
  ],
  child: {
    parfum: {
      title: "Ətir",
      filters: [],
      features: [
        {
          title: "parfumType",
          value: parfumType,
        },
      ],
    },
    skincare: {
      title: "Dəriyə qulluq",
      filters: [],
      features: [
        {
          title: "formType",
          value: formType,
        },
      ],
    },
    makeup: {
      title: "Makiyaj",
      filters: [],
      features: [
        {
          title: "formType",
          value: formType,
        },
      ],
    },
    other: {
      title: "Digər",
      filters: [],
      features: [
        {
          title: "formType",
          value: formType,
        },
      ],
    },
  },
};
