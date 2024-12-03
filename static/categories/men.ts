import { colors } from "../filters/colors";
import { season } from "../feautures/clothings";
import { ICategoriesValue } from "@/types/interfaces";
import { clothing } from "./men/clothing";
import { shoes } from "./men/shoes";
import { accessories } from "./men/accessories";
import { scincare } from "./men/scincare";

const men: ICategoriesValue = {
  title: "Kişi",
  filters: [{ title: "color", value: colors }],
  features: [{ title: "season", value: season }],
  subs: {
    clothing,
    shoes,
    accessories,
    // scincare,
  },
};

export default men;
