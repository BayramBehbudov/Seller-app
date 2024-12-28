import { ICategoriesValue } from "@/types/interfaces";
import { phone } from "./electronics/phone";
import { televisions } from "./electronics/tv";
import { computer } from "./electronics/computer";
import { kitchen } from "./electronics/kitchen";

const electronics: ICategoriesValue = {
  title: "Elektronika",
  features: [],
  filters: [{ title: "screenSizes", value: [] }],
  subs: {
   kitchen,
   //  phone,
   //  computer,
   //  televisions,
  },
};

export default electronics;
