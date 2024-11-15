import { IResponse, IResponseData } from "@/types/interfaces";
import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

const useAppwrite = (
  fn: (query?: string | string[]) => Promise<IResponse | undefined>
) => {
  const [data, setData] = useState<IResponseData>(undefined);

  const fetchData = async () => {
    const posts = await fn();
    setData(posts?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, refetch };
};

export default useAppwrite;
