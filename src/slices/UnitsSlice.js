import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUnits } from "../api/units";
import { createUnits, updateUnits } from "../api/units";


export const getUnitsThunk = createAsyncThunk(
  "Units/getUnits",
  async function getUnitsAsync() {
    const result = await getUnits();
    return result.data;
  }
)
export const createUnitsThunk = createAsyncThunk(
  "Units/createUnits",
  async function createUnitsAsync({unitName}) {
    const result = await createUnits(unitName);
    return result.data;
  }
)

export const updateUnitsThunk = createAsyncThunk(
  "Units/updateUnits",
  async function updateUnitsAsync({unitName,unitId}) {
    const result = await updateUnits(unitName,unitId);
    return result.data;
  }
)


const initialState = {
  units: [],
  isLoading: false,
  isLoaded: false,
  error: null
}
export const UnitsSlice = createSlice({
  name: 'UnitsSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getUnitsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUnitsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.units = action.payload;

    });
    builder.addCase(getUnitsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createUnitsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createUnitsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(createUnitsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateUnitsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUnitsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(updateUnitsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  }

})
export const {} = UnitsSlice.actions;
export default UnitsSlice.reducer;
