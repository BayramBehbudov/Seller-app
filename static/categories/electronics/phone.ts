import { ISubCategoryValue } from "@/types/interfaces";

export const phone: ISubCategoryValue = {
   title: 'Telefonlar',
   filters: [],
   features: [],
   child: {
      smartphones: {
         title: 'Smartfonlar',
         filters: [{ title: 'color', value: [] }],
         features: [],
      },
      accessories: {
         title: 'Aksessuarlar',
         filters: [],
         features: [],
      },
      tablets: {
         title: 'Planşetlər',
         filters: [],
         features: [],
      },
   },
}