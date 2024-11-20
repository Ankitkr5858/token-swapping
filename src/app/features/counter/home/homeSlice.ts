import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { makeApiCall } from "@/app/mixinApi/api";
import { getData } from "./homeAPI";


const initialState =  {
  products: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try  {
    const response = await getData();
    return response;
    }
    catch (error) {
      throw new Error("Faild to resolves this promise");
    }
  }
);

// Create the products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        // Optionally handle error state here
        // state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
