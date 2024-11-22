import { makeApiCall } from "@/app/mixinApi/api";

export const fetchAllCoin = async (input: { currency: string } | string) => {
  const currency = typeof input === "string" ? input : input.currency;

  try {
    const response = await makeApiCall<any>({
      url: `markets?vs_currency=${currency}`,
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-pos6h1UzWPUoJGvcakzso5rQ",
      },
      noAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchSelectedCoinData = async (coinId: any) => {
  try {
    const response = await makeApiCall<any>({
      url: `${coinId}`,
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-pos6h1UzWPUoJGvcakzso5rQ",
      },
      noAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};


export const fetchHistoricalData = async (coinId:any, currency:any) => {
  try {
    const response = await makeApiCall<any>({
      url: `${coinId}/market_chart?vs_currency=${currency}&days=10&interval=daily`,
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-pos6h1UzWPUoJGvcakzso5rQ",
      },
      noAuth: true,
    });

    return response;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};
