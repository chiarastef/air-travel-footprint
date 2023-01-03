import React from "react";
import axios from "axios";

export const useGetToken = () => {
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    // Get api access token
    axios({
      method: "post",
      url: "https://test.api.amadeus.com/v1/security/oauth2/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: `grant_type=client_credentials&client_id=${
        import.meta.env.VITE_AIRLABS_API_KEY
      }&client_secret=${import.meta.env.VITE_AIRLABS_API_SECRET}`,
    }).then((response) => setToken(response.data.access_token));
  }, []);

  return { token };
};
