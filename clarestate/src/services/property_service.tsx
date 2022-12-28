import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

//@ts-ignore
const server_url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function PropertyService() {
  const [page, setPage] = useState(1);

  const fetchProperties = async (page: number) => {
    return await axios.get(
      `${server_url}/api/properties?_limit=2&page=${page}`
    );
  };

  const { data, isSuccess, isLoading, error } = useQuery(
    ["properties", page],
    () => fetchProperties(page)
  );

  return { data, isSuccess, isLoading, error };
}
