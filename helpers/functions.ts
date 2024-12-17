export const getSlicedID = (id: string) => {
  return id.slice(id.length - 6).toUpperCase();
};

export const getOrderStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "Gözləyir";
    case "ready":
      return "Hazırdır";
    case "handOver":
      return "Təhvil verdim";
    default:
      return status;
  }
};

export const getPromoInfo = (p: string) => {
  switch (p) {
    case "buyXgetY":
      return "Bu aksiyanı əlavə etdiyiniz məhsullardan X qədər səbətə əlavə edilsə Y qədər endirim tətbiq ediləcək. Endirim məbləği seçdiyiniz məhsulun qiymətinə əsasən hesablanacaqdır";
    case "percentage":
      return "Bu aksiyanı əlavə etdiyiniz məhsullara qeyd etdiyiniz faiz qədər endirim məbləği tətbiq ediləcəkdir";
    case "countPercentage":
      return "Bu aksiyanı əlavə etdiyiniz məhsullardan 'Minimum alış sayı' qədər səbətə əlavə edilsə qeyd etdiyiniz faiz qədər endirim məbləği tətbiq ediləcəkdir";

    case "together":
      return "Bu aksiyaya 2 məhsul əlavə edə bilərsiniz və əlavə etdiyiniz məhsulları müştəri səbətə əlavə etsə qeyd etdiyiniz qədər endirim təyin ediləcək";
    default:
      return "";
  }
};
