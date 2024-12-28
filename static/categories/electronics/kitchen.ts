import { matereal, power } from "@/static/feautures/electronics";
import { ISubCategoryValue } from "@/types/interfaces";

export const kitchen: ISubCategoryValue = {
  title: "Mətbəx avadanlıqları",
  filters: [],
  features: [
    {
      title: "matereal",
      value: matereal,
    },
    {
      title: "power",
      value: power,
    },
  ],
  child: {
    kettle: {
      title: "Çay/kofe",
      filters: [],
      features: [],
    },
    blender: {
      title: "Blender/Mikser",
      filters: [],
      features: [],
    },
    cleaner: {
      title: "Təmizlik",
      filters: [],
      features: [],
    },
    iron: {
      title: "Ütü",
      filters: [],
      features: [],
    },
    food: {
      title: "Qida",
      filters: [],
      features: [],
    },
  },
};
