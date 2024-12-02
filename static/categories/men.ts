import { colors } from "../filters/colors";
import { season } from "../feautures/clothings";
import { ICategoriesValue } from "@/types/interfaces";
import { clothing } from "./men/clothing";
import { shoes } from "./men/shoes";
import { accessories } from "./men/accessories";

const men: ICategoriesValue = {
  title: "Kişi",
  filters: [{ title: "color", value: colors }],
  features: [{ title: "season", value: season }],
  subs: {
    clothing,
    shoes,
    accessories,
  },
};

export default men;
