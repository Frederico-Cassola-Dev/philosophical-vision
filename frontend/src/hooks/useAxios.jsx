import { useEffect, useState } from "react";
import axios from "axios";
import getBackendUrl from "../../env"; // Adjust the path as needed

export default function useAxios(request, dependencies = []) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = getBackendUrl();
    axios({
      method: request.method,
      url: `${apiUrl}/api/${request.endpoint}`,
      data: request.data ? request.data : "",
    })
      .then((fetchResponse) => {
        setResponse(fetchResponse.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, dependencies);

  return { response, error };
}
