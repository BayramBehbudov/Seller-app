import {
  beltMatereals,
  frameShapes,
  jewelryTypes,
  lensTypes,
  watchMatereals,
  watchTypes,
} from "@/static/feautures/accessories";
import { waterResistanceLevels } from "@/static/feautures/electronics";
import { glassType, matereal, patterns } from "@/static/feautures/global";
import { colors } from "@/static/filters/colors";
import { diametr, letterSize, numSize } from "@/static/filters/sizes";
import { ISubCategoryValue } from "@/types/interfaces";

export const accessories: ISubCategoryValue = {
  title: "Aksesuarlar",
  filters: [
    {
      title: "color",
      value: colors,
    },
  ],
  features: [],
  child: {
    watches: {
      title: "Saat",
      filters: [],
      features: [
        { title: "watchMatereals", value: watchMatereals },
        { title: "beltMatereals", value: beltMatereals },
        { title: "diametr", value: diametr },
        { title: "watchTypes", value: watchTypes },
        { title: "waterResistanceLevels", value: waterResistanceLevels },
        { title: "glass", value: glassType },
      ],
    },
    sunglasses: {
      title: "Eynək",
      filters: [],
      features: [
        { title: "lensTypes", value: lensTypes },
        { title: "frameShapes", value: frameShapes },
        { title: "glass", value: glassType },
      ],
    },
    bag: {
      title: "Çanta/Pulqabı",
      filters: [],
      features: [
        { title: "patterns", value: patterns },
        { title: "matereal", value: matereal.slice(0, 10) },
      ],
    },
    belts: {
      title: "Kəmər",
      filters: [],
      features: [{ title: "beltMatereals", value: beltMatereals }],
    },
    scarves: {
      title: "Papaq/Şərf",
      filters: [
        {
          title: "size",
          value: [
            ...numSize.slice(50, 60),
            ...letterSize.slice(2, 5),
            "Standart",
            "Böyüdülə/kiçildilə bilən",
          ],
        },
      ],
      features: [
        { title: "patterns", value: patterns },
        { title: "matereal", value: matereal },
      ],
    },
    jewelry: {
      title: "Zərgərlik aksesuarları",
      filters: [],
      features: [
        { title: "matereal", value: patterns },
        { title: "jewelryTypes", value: jewelryTypes },
      ],
    },
  },
};
