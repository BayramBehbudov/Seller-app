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
