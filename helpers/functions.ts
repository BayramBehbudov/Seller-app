export const getSlicedID = (id: string) => {
  return "#" + id.slice(id.length - 6).toUpperCase();
};

export const getOrderStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "Gözləyir";
    case "ready":
      return "Hazırdır";
    case "handOver":
      return "Təhvil verdim";
    case "fullfilled":
      return "Tamamlanıb";
    case "cancelled":
      return "Ləğv edilib";
    case "delivered":
      return "Çatdırılır";
    case "accepted":
      return "Təyinat məntəqəsində";
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

export const translatePromoType = (type: string) => {
  switch (type) {
    case "buyXgetY":
      return "X al Y ödə";
    case "percentage":
      return "Faiz endirimi";
    case "countPercentage":
      return "Məhsul sayına uyğun faiz endirimi";
    case "together":
      return "İki məhsula birlikdə endirim";
    default:
      return "Digər";
  }
};


export const getPromoTypeColor = (type: string) => {
  switch (type) {
    case "percentage":
      return "bg-blue-500";
    case "buyXgetY":
      return "bg-purple-500";
    case "countPercentage":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};


export const getDiscountSymbol = (type: string) => {
  return type === "percentage" || type === "countPercentage" ? "%" : "";
};
