import { ISubCategoryValue } from "@/types/interfaces";

export const computer: ISubCategoryValue = {
    title: 'Kompüterlər',
    filters: [],
    features: [],
    child: {
       laptops: {
          title: 'Noutbuklar',
          filters: [],
          features: [],
       },
       desktops: {
          title: 'Masaüstü kompüterlər',
          filters: [],
          features: [],
       },
       accessories: {
          title: 'Aksessuarlar',
          filters: [],
          features: [],
       },
    },
 }