import { ICategoriesValue, ISubCategoryValue } from '@/types/interfaces'

const sportsEquipment: ISubCategoryValue = {
   title: 'İdman avadanlığı',
   filters: [],
   features: [],
   child: {
      'weightlifting-sets': {
         title: 'Ağırlıq qaldırma dəstləri',
         filters: [],
         features: [],
      },
      yoga: {
         title: 'Yoga ləvazimatları',
         filters: [],
         features: [],
      },
      'fitness-equipment': {
         title: 'Fitness avadanlıqları',
         filters: [],
         features: [],
      },

      'swimming-pools': {
         title: 'Üzgüçülük ləvazimatları',
         filters: [],
         features: [],
      },
   },
}
const travelAndCamping: ISubCategoryValue = {
   title: 'Səyahət və düşərgə',
   filters: [],
   features: [],
   child: {
      tents: {
         title: 'Çadırlar',
         filters: [],
         features: [],
      },
      backpacks: {
         title: 'Bel çantaları',
         filters: [],
         features: [],
      },
      'sleeping-bags': {
         title: 'Yuxu torbaları',
         filters: [],
         features: [],
      },
   },
}
const sportsAndHobbies: ICategoriesValue = {
   title: 'İdman və Hobbilər',
   features: [],
   filters: [],
   subs: {
      sportsEquipment,
      travelAndCamping,
   },
}

export default sportsAndHobbies
