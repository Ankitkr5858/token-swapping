import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCoin } from "./coinAPI";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  ath: number;
  atl: number;
  circulating_supply: number;
  fully_diluted_valuation: number;
  high_24h: number;
  low_24h: number;
  last_updated: string;
}

interface CoinState {
  data: Coin[];
  loading: boolean;
  error: string | null;
  currency: string;
  symbol: string;
}


// Initial state
const initialState: CoinState = {
  data: [],
  loading: false,
  error: null,
  currency: "usd",
  symbol: "$",
};

export const fetchCoinData = createAsyncThunk(
  "coin/fetchCoinData",
  async (currency: string) => {
    try {
      const response = await fetchAllCoin({ currency });
      return response; 
    } catch (error) {
      throw new Error("Failed to fetch coin data");
    }
  }
);

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinData.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchCoinData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
        const currencySymbolMap: Record<string, string> = {
          usd: "$",
          eur: "€",
          inr: "₹",
        };
        state.currency = action.meta.arg; 
        state.symbol = currencySymbolMap[action.meta.arg] || "";
      })
      .addCase(fetchCoinData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coin data"; 
      });
  },
});

export default coinSlice.reducer;
