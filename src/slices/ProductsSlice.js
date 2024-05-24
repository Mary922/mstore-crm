import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../api/products";

export const getProductsThunk = createAsyncThunk(
  "Products/getProducts",
  async function getProductsAsync() {
    const result = await getProducts();
    return result.data;
  }
)

const initialState = {
  products: [],
  isLoading: false,
  isLoaded: false,
  error: null
}
export const ProductsSlice = createSlice({
  name: 'ProductsSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.pending, (state, action) => {
      state.isLoading = true;
      state.isLoaded = false;
    });
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.products = action.payload;
    });
    builder.addCase(getProductsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
})
export const {} = ProductsSlice.actions;
export default ProductsSlice.reducer;
