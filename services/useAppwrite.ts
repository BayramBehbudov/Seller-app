// import { IResponse } from "@/types/interfaces";
// import { useEffect, useState } from "react";

// const useAppwrite = (
//   fn: (query?: string | string[]) => Promise<IResponse | undefined>
// ) => {
//   const [data, setData] = useState<IResponse | undefined>(undefined);

//   const fetchData = async () => {
//     const posts = await fn();
//     setData(posts?.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const refetch = () => fetchData();

//   return { data, refetch };
// };

// export default useAppwrite;
