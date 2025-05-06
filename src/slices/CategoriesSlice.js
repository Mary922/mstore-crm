import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getCategories,createCategories, updateCategories,deleteCategories} from "../api/categories";


export const getCategoriesThunk = createAsyncThunk(
  "Categories/getCategories",
  async function getCategoriesAsync(){
    const result = await getCategories();
    return result.data;
  }
)

export const createCategoriesThunk = createAsyncThunk(
  "Categories/createCategories",
  async function createCategoriesAsync({categoryName,gender,parentId}) {
    const result = await createCategories(categoryName,gender,parentId);
    return result.data;
  }
)

export const updateCategoriesThunk = createAsyncThunk(
  "Categories/updateCategories",
  async function updateCategoriesAsync({categoryName,categoryId,gender,parentId}) {
    const result = await updateCategories(categoryName,categoryId,gender,parentId);
    return result.data;
  }
)

export const deleteCategoriesThunk = createAsyncThunk(
  "Categories/deleteCategories",
  async function deleteCategoriesAsync({categoryId}) {
    const result = await deleteCategories(categoryId);
    return result.data;
  }
)


const initialState = {
  categories: [],
  isLoading: false,
  isLoaded: false,
}
export const CategoriesSlice = createSlice({
  name: "Categories",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.pending, (state, action) => {
      state.isLoading = true;
      state.isLoaded = false;
    });
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.categories = action.payload;
    });
    builder.addCase(getCategoriesThunk.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createCategoriesThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createCategoriesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(createCategoriesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateCategoriesThunk.pending, (state, action) => {
      state.isLoading = true;
      state.isLoaded = false;
    });
    builder.addCase(updateCategoriesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(updateCategoriesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteCategoriesThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategoriesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(deleteCategoriesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
})

export const {} = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
