import { ICategoriesValue } from "@/types/interfaces";
import { kitchenware } from "./home/kitchen";
import { textile } from "./home/textile";

const homeAndGarden: ICategoriesValue = {
  title: "Ev və Bağ",
  features: [],
  filters: [],
  subs: {
    textile,
    kitchenware,
  },
};

export default homeAndGarden;
