export const translateAttributes = (filter: string) => {
  switch (filter) {
    case "size":
      return "Ölçü";
    case "color":
      return "Rəng";
    default:
      return filter;
  }
};
