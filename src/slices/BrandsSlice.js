import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBrands,createBrands,updateBrands } from "../api/brands";

export const getBrandsThunk = createAsyncThunk(
  "Brands/getBrands",
  async function getBrandsAsync() {
    const result = await getBrands();
    return result.data;
  }
)
export const createBrandsThunk = createAsyncThunk(
  "Brands/createBrands",
  async function createBrandsAsync({brandName}) {
    const result = await createBrands(brandName);
    return result.data;
  }
)

export const updateBrandsThunk = createAsyncThunk(
  "Brands/updateBrands",
  async function updateBrandsAsync({brandName,brandId}) {
    const result = await updateBrands(brandName,brandId);
    return result.data;
  }
)


const initialState = {
  brands: [],
  isLoading: false,
  isLoaded: false,
  error: null
}
export const BrandsSlice = createSlice({
  name: 'BrandsSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getBrandsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBrandsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.brands = action.payload;

    });
    builder.addCase(getBrandsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createBrandsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createBrandsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(createBrandsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateBrandsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateBrandsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(updateBrandsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  }

})
export const {} = BrandsSlice.actions;
export default BrandsSlice.reducer;
