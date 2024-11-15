import { ICategoriesValue, ISubCategoryValue } from '@/types/interfaces'

import { colors } from '../filters/colors'
import { kidsSize, numSize } from '../filters/sizes'

const clothing: ISubCategoryValue = {
   title: 'Geyim',
   filters: [{ title: 'size', value: [...kidsSize, ...numSize.slice(0, 11)] }],
   features:[],
   child: {
      shirts: {
         title: 'Köynəklər',
         filters: [],
         features: [],
      },
      pants: {
         title: 'Şalvarlar',
         filters: [],
         features: [],
      },
      jackets: {
         title: 'Gödəkçələr',
         filters: [],
         features: [],
      },
      dresses: {
         title: 'Donlar',
         filters: [],
         features: [],
      },
      blouses: {
         title: 'Bluzlar',
         filters: [],
         features: [],
      },
      skirts: {
         title: 'Ətəklər',
         filters: [],
         features: [],
      },
      suits: {
         title: 'Kostyumlar',
         filters: [],
         features: [],
      },
   },
}

const shoes: ISubCategoryValue = {
   title: 'Ayaqqabı',
   filters: [{ title: 'size', value: [] }],
   features:[],
   child: {
      'classic-shoes': {
         title: 'Klassik ayaqqabı',
         filters: [],
         features: [],
      },
      sneakers: {
         title: 'İdman ayaqqabısı',
         filters: [],
         features: [],
      },
      boots: {
         title: 'Çəkmələr',
         filters: [],
         features: [],
      },
      sandals: {
         title: 'Sandallar',
         filters: [],
         features: [],
      },
   },
}

const accessories: ISubCategoryValue = {
   title: 'Aksesuarlar',
   features:[],
   filters: [],
   child: {
      belts: {
         title: 'Kəmərlər',
         filters: [],
         features: [],
      },
      scarves: {
         title: 'Şərflər',
         filters: [],
         features: [],
      },
      sunglasses: {
         title: 'Eynəklər',
         filters: [],
         features: [],
      },
      watches: {
         title: 'Saatlar',
         filters: [],
         features: [],
      },
      bags: {
         title: 'Çantalar',
         filters: [],
         features: [],
      },
   },
}
const kids: ICategoriesValue = {
   title: 'Uşaqlar',
   filters: [{ title: 'color', value: colors }],
   features:[],
   subs: {
      clothing,
      shoes,
      accessories,
   },
}

export default kids
