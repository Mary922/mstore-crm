import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCountries } from "../api/countries";

export const getCountriesThunk = createAsyncThunk(
  "Countries/getCountries",
  async function getCountriesAsync() {
    const result = await getCountries();
    return result.data;
  }
)

const initialState = {
  countries: [],
  isLoading: false,
  isLoaded: false,
  error: null
}
export const CountriesSlice = createSlice({
  name: 'CountriesSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getCountriesThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCountriesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
      // console.log('PASDASDASD', action.payload);
      state.countries = action.payload;

    });
    builder.addCase(getCountriesThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }

})
export const {} = CountriesSlice.actions;
export default CountriesSlice.reducer;
