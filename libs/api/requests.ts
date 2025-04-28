import axios from "axios";
import { baseUrl } from "./baseurl";

/* 
    Request using try catch.
    This request accepts (methods) for:
        1. Get data from the server
        2. Post data to the server
        3. Put data to the server
        4. Delete data from the server
    It takes the url, params and headers as parameters
    It returns the response data
    It throws an error if there is an error in the request
*/
export const requestData = async (
  method: "get" | "post" | "put" | "delete",
  path: string,
  data?: any,
  params?: any,
  headers?: any
) => {
  console.log(`${baseUrl}${path}`);
  try {
    const response = await axios({
      method,
      url: `${baseUrl}${path}`,
      data,
      params,
      headers,
    });

    // console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in getRequest:",
      (error as any)?.response?.data?.message || error
    );
    throw (error as any)?.response?.data;
  }
};
