import { ICategoriesValue } from "@/types/interfaces";
import { clothing } from "./women/clothing";
import { shoes } from "./women/shoes";
import { accessories } from "./men/accessories";
import { colors } from "../filters/colors";
import { season } from "../feautures/clothings";
import { underwear } from "./women/underwear";
import { scincare } from "./women/scincare";

const women: ICategoriesValue = {
  title: "Qadın",
  filters: [{ title: "color", value: colors }],
  features: [{ title: "season", value: season }],

  subs: {
    clothing,
    shoes,
    accessories,
    underwear,
    // scincare,
  },
};

export default women;
