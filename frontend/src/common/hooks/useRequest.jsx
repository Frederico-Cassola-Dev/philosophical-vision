import { useEffect, useState } from "react";
import axios from "axios";

export default function useRequest(request) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    axios({
      method: request.method,
      url: `${import.meta.env.VITE_BACKEND_URL}/api/${request.endpoint}`,
      data: request.data ? request.data : "",
    })
      .then((fetchResponse) => {
        setResponse(fetchResponse.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return response;
}