import { server_url } from "../../../utils/junk";
import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function QueriedProperty() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const location = queryParams.get("location");
  const purpose = queryParams.get("purpose");

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const response = await axios.get(
      `${server_url}/api/properties?location=${location}&purpose=${purpose}`
    );
    console.log(response.data);
  };

  return (
    <div>
      <h1>{location}</h1>
      <h1>{purpose}</h1>
    </div>
  );
}
