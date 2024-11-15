import { colors } from '../filters/colors'
import {
   closureTypes,
   collarTypes,
   hoodOptions,
   liningOptions,
   material,
   patterns,
   pocketOptions,
   season,
   sleeveLength,
} from '../feautures/clothings'
import { heelHeight, liningType, shoeClosureType, shoeMaterial, soleType } from '../feautures/shoe'
import { beltMaterials, frameShapes, lensTypes, watchMaterials, watchTypes } from '../feautures/accessories'
import { letterSize } from '../filters/sizes'
import { ICategoriesValue, ISubCategoryValue } from '@/types/interfaces'

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
         title: 'Kostyum',
         filters: [],
         features: [
            { title: 'sleeveLength', value: sleeveLength },
            { title: 'collarTypes', value: collarTypes },
         ],
      },
      shirts: {
         title: 'Köynək',
         filters: [],
         features: [
            { title: 'sleeveLength', value: sleeveLength },
            { title: 'collarTypes', value: collarTypes },
            { title: 'hoodOptions', value: hoodOptions },
         ],
      },
      pants: {
         title: 'Şalvar',
         filters: [],
         features: [],
      },
      jackets: {
         title: 'Gödəkçə',
         filters: [],
         features: [
            { title: 'sleeveLength', value: sleeveLength },
            { title: 'collarTypes', value: collarTypes },
            { title: 'hoodOptions', value: hoodOptions },
         ],
      },
      shorts: { title: 'Şortik', filters: [], features: [] },
   },
}

const shoes: ISubCategoryValue = {
   title: 'Ayaqqabı',
   filters: [{ title: 'size', value: [] }],
   features: [
      { title: 'closureTypes', value: shoeClosureType },
      { title: 'shoeMaterial', value: shoeMaterial },
      { title: 'soleType', value: soleType },
      { title: 'liningType', value: liningType },
      { title: 'heelHeight', value: heelHeight },
   ],
   child: {
      sneakers: {
         title: 'İdman ayaqqabısı',
         filters: [],
         features: [],
      },
      'classic-shoes': {
         title: 'Klassik ayaqqabı',
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
   filters: [],
   features: [],
   child: {
      belts: {
         title: 'Kəmərlər',
         filters: [],
         features: [{ title: 'beltMaterials', value: beltMaterials }],
      },
      scarves: {
         title: 'Şərflər',
         filters: [],
         features: [{ title: 'patterns', value: patterns }],
      },

      sunglasses: {
         title: 'Eynəklər',
         filters: [],
         features: [
            { title: 'lensTypes', value: lensTypes },
            { title: 'frameShapes', value: frameShapes },
         ],
      },
      watches: {
         title: 'Saatlar',
         filters: [],
         features: [
            { title: 'watchMaterials', value: watchMaterials },
            { title: 'watchTypes', value: watchTypes },
         ],
      },
   },
}

const men: ICategoriesValue = {
   title: 'Kişi',
   filters: [{ title: 'color', value: colors }],
   features: [{ title: 'season', value: season }],
   subs: {
      clothing,
      shoes,
      accessories,
   },
}

export default men
