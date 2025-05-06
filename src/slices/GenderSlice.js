import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBrands,createBrands,updateBrands } from "../api/brands";
import { createGenders, getGenders, updateGenders } from "../api/genders";

export const getGendersThunk = createAsyncThunk(
	"Genders/getGenders",
	async function getGendersAsync() {
		const result = await getGenders();
		return result.data;
	}
)

export const createGendersThunk = createAsyncThunk(
	"Genders/createGenders",
	async function createGendersAsync({genderName}) {
		const result = await createGenders(genderName);
		return result.data;
	}
)

export const updateGendersThunk = createAsyncThunk(
	"Genders/updateGenders",
	async function updateGendersAsync({genderName,genderId}) {
		const result = await updateGenders(genderName,genderId);
		return result.data;
	}
)


const initialState = {
	genders: [],
	isLoading: false,
	isLoaded: false,
	error: null
}
export const GendersSlice = createSlice({
	name: 'GendersSlice',
	initialState: initialState,
	extraReducers: (builder) => {
		builder.addCase(getGendersThunk.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(getGendersThunk.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isLoaded = true;
			state.genders = action.payload;

		});
		builder.addCase(getGendersThunk.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		builder.addCase(createGendersThunk.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(createGendersThunk.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isLoaded = true;
		});
		builder.addCase(createGendersThunk.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		builder.addCase(updateGendersThunk.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(updateGendersThunk.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isLoaded = true;
		});
		builder.addCase(updateGendersThunk.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		})
	}

})
export const {} = GendersSlice.actions;
export default GendersSlice.reducer;
