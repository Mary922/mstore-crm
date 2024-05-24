import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getColors,createColors,updateColors,deleteColors } from "../api/colors";


export const getColorsThunk = createAsyncThunk(
  "Colors/getColors",
  async function getColorsAsync() {
    const result = await getColors();
    return result.data;
  }
)

export const createColorsThunk = createAsyncThunk(
  "Colors/createColors",
  async function createColorsAsync({colorName,colorRGB}) {
    const result = await createColors(colorName,colorRGB);
    return result.data;
  }
)

export const updateColorsThunk = createAsyncThunk(
  "Colors/updateColors",
  async function updateColorsAsync({colorName,colorRGB,colorId}) {
    const result = await updateColors(colorName,colorRGB, colorId);
    return result.data;
  }
)

export const deleteColorsThunk = createAsyncThunk(
  "Colors/deleteColors",
  async function deleteColorsAsync({colorId}) {
    const result = await deleteColors(colorId);
    return result.data;
  }
)


const initialState = {
  colors: [],
  isLoading: false,
  isLoaded: false,
  error: null
}
export const ColorsSlice = createSlice({
  name: 'ColorsSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getColorsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getColorsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.colors = action.payload;
    });
    builder.addCase(getColorsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createColorsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createColorsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(createColorsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateColorsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateColorsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(updateColorsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteColorsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteColorsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(deleteColorsThunk.rejected, (state, action) => {
      state.isLoading = false;
    })
  }

})
export const {} = ColorsSlice.actions;
export default ColorsSlice.reducer;
