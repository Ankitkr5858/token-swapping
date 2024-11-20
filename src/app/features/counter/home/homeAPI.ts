

import { makeApiCall } from "@/app/mixinApi/api";  


export const getData = async () => {
  try {
    const response = await makeApiCall<any>({
      url: "products",  
      method: "GET",
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};
