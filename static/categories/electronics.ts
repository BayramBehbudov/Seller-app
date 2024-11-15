import { ICategoriesValue, ISubCategoryValue } from '@/types/interfaces'

const phones: ISubCategoryValue = {
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

const computers: ISubCategoryValue = {
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

const televisions: ISubCategoryValue = {
   title: 'Televizorlar',
   filters: [],
   features: [],
   child: {
      'smart-tv': {
         title: 'Smart TV',
         filters: [],
         features: [],
      },
      'led-tv': {
         title: 'LED TV',
         filters: [],
         features: [],
      },
      '4k-tv': {
         title: '4K TV',
         filters: [],
         features: [],
      },
   },
}
const electronics: ICategoriesValue = {
   title: 'Elektronika',
   features: [],
   filters: [{ title: 'screenSizes', value: [] }],
   subs: {
      phones,
      computers,
      televisions,
   },
}

export default electronics
