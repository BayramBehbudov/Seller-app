export const translateFeatures = (text: string) => {
   switch (text) {
      case 'beltMaterials':
         return 'Kəmər matrealı'

      case 'watchMaterials':
         return 'Saat matrealı'

      case 'watchTypes':
         return 'Saat tipi'

      case 'lensTypes':
         return 'Lens tipi'

      case 'frameShapes':
         return 'Çərçivə forması'

      case 'season':
         return 'Mövsüm'
      case 'sleeveLength':
         return 'Qol uzunluq'
      case 'patterns':
         return 'Bəzəklər'
      case 'collarTypes':
         return 'Yaxa tipi'
      case 'closureTypes':
         return 'Bağlanma forması'

      case 'heelHeight':
         return 'Daban hündürlüyü'

      case 'material':
         return 'Material'

      case 'hoodOptions':
         return 'Kapşon forması'

      case 'pocketOptions':
         return 'Cib forması'

      case 'liningOptions':
         return 'Astar forması'

      case 'operatingSystem':
         return 'Əməliyyat sistemi'

      case 'batteryCapacities':
         return 'Batareya həcmi'

      case 'screenSizes':
         return 'Ekran ölçüsü'
      case 'waterResistanceLevels':
         return 'Suya davamlılıq'
      case 'otherElectronicsFeatures':
         return 'Digər'
      case 'shoeMaterial':
         return 'Material'
      case 'soleType':
         return 'Altlıq tipi'
      case 'shoeClosureType':
         return 'Bağlanma tipi'
      case 'liningType':
         return 'Astar tipi'
      default:
         return 'Seçin'
   }
}
