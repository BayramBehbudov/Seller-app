export function hoursSince(dateString: string): number {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now.getTime() - past.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  return diffInHours;
}

export function formatterDate(dateString: string) {
  return dateString.slice(0, 10) + "  /  " + dateString.slice(11, 16);
}


// export function daysSince(dateString: string): number {
//   const now = new Date();
//   const past = new Date(dateString);
//   const diffInMs = now.getTime() - past.getTime();
//   const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//   return diffInDays;
// }

// export function minutesSince(dateString: string): number {
//   const now = new Date();
//   const past = new Date(dateString);
//   const diffInMs = now.getTime() - past.getTime();
//   const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

//   return diffInMinutes;
// }
