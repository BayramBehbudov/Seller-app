import { ICategoriesValue, ISubCategoryValue } from '@/types/interfaces'

const furniture: ISubCategoryValue = {
   title: 'Mebel',
   filters: [],
   features: [],
   child: {
      sofas: {
         title: 'Divanlar',
         filters: [],
         features: [],
      },
      tables: {
         title: 'Stollar',
         filters: [],
         features: [],
      },
      chairs: {
         title: 'Kreslolar',
         filters: [],
         features: [],
      },
   },
}
const kitchenware: ISubCategoryValue = {
   title: 'Mətbəx əşyaları',
   features: [],
   filters: [],
   child: {
      pots: {
         title: 'Qazanlar',
         filters: [],
         features: [],
      },
      knives: {
         title: 'Bıçaqlar',
         filters: [],
         features: [],
      },
      dishes: {
         title: 'Qablar',
         filters: [],
         features: [],
      },
   },
}
const accessories: ISubCategoryValue = {
   title: 'Aksesuarlar',
   features: [],
   filters: [],
   child: {
      'home-accessories': {
         title: 'Ev aksesuarları',
         filters: [],
         features: [],
      },

      'garden-accessories': {
         title: 'Bağ aksesuarları',
         filters: [],
         features: [],
      },
   },
}

const homeAndGarden: ICategoriesValue = {
   title: 'Ev və Bağ',
   features: [],
   filters: [],
   subs: {
      kitchenware,
      furniture,
      accessories,
   },
}

export default homeAndGarden
