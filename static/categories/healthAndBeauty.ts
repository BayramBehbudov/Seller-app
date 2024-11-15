import { ICategoriesValue, ISubCategoryValue } from '@/types/interfaces'

const makeup: ISubCategoryValue = {
   title: 'Makiyaj',
   filters: [],
   features: [],
   child: {
      lipsticks: {
         title: 'Dodaq boyaları',
         filters: [],
         features: [],
      },

      eyeshadows: {
         title: 'Göz kölgələri',
         filters: [],
         features: [],
      },
      foundations: {
         title: 'Tonal kremlər',
         filters: [],
         features: [],
      },
   },
}

const skincare: ISubCategoryValue = {
   title: 'Dəriyə qulluq',
   features: [],
   filters: [],
   child: {
      'face-masks': {
         title: 'Üz maskaları',
         filters: [],
         features: [],
      },

      moisturizers: {
         title: 'Nəmləndiricilər',
         filters: [],
         features: [],
      },
      cleansers: {
         title: 'Təmizləyicilər',
         filters: [],
         features: [],
      },
   },
}

const hairCare: ISubCategoryValue = {
   title: 'Saç baxımı',
   features: [],
   filters: [],
   child: {
      shampoos: {
         title: 'Şampunlar',
         filters: [],
         features: [],
      },
      'hair-masks': {
         title: 'Saç maskaları',
         filters: [],
         features: [],
      },
      'hair-oil': {
         title: 'Saç yağı',
         filters: [],
         features: [],
      },
   },
}
const healthAndBeauty: ICategoriesValue = {
   title: 'Sağlamlıq və Gözəllik',
   features: [],
   filters: [],
   subs: {
      makeup,
      skincare,
      hairCare,
   },
}

export default healthAndBeauty
