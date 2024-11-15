import { ICategoriesValue, ISubCategoryValue } from '@/types/interfaces'
import { letterSize } from '../filters/sizes'
import { closureTypes, collarTypes, liningOptions, material, patterns, pocketOptions, sleeveLength } from '../feautures/clothings'

const clothing: ISubCategoryValue = {
   title: 'Geyim',
   filters: [{ title: 'size', value: letterSize }],
   features: [
      { title: 'patterns', value: patterns },
      { title: 'closureTypes', value: closureTypes },
      { title: 'pocketOptions', value: pocketOptions },
      { title: 'liningOptions', value: liningOptions },
      { title: 'material', value: material },
   ],
   child: {
      suits: {
         title: 'Kostyumlar',
         filters: [],
         features: [
            { title: 'sleeveLength', value: sleeveLength },
            { title: 'collarTypes', value: collarTypes },
         ],
      },
      shirts: {
         title: 'Köynəklər',
         filters: [],
         features: [],
      },
      jeans: {
         title: 'Cinslər',
         filters: [],
         features: [],
      },
      pants: {
         title: 'Şalvarlar',
         filters: [],
         features: [],
      },
      jackets: { title: 'Gödəkçələr', filters: [], features: [] },
      dresses: { title: 'Donlar', filters: [], features: [] },
      blouses: { title: 'Bluzlar', filters: [], features: [] },
      skirts: { title: 'Ətəklər', filters: [], features: [] },
      bra: { title: 'Büstqalterlər', filters: [], features: [] },
   },
}

const shoes: ISubCategoryValue = {
   title: 'Ayaqqabı',
   filters: [{ title: 'size', value: [] }],
   features: [],
   child: {
      heels: {
         title: 'Topuqlu ayaqqabılar',
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
      sneakers: {
         title: 'İdman ayaqqabısı',
         filters: [],
         features: [],
      },
   },
}

const accessories: ISubCategoryValue = {
   title: 'Aksesuarlar',
   filters: [],
   features: [],
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
      jewelry: {
         title: 'Bijuteriya',
         filters: [],
         features: [],
      },
   },
}

const women: ICategoriesValue = {
   title: 'Qadın',
   filters: [{ title: 'color', value: [] }],
   features: [],
   subs: {
      clothing,
      shoes,
      accessories,
   },
}

export default women
