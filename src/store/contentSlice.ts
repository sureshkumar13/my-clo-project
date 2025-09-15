import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentState {
  items: any[]; 
  filters: {
    paid: boolean;
    free: boolean;
    viewOnly: boolean;
  };
  searchKeyword: string;
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  items: [],
  filters: { paid: false, free: false, viewOnly: false },
  searchKeyword: '',
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    fetchRequest(state) { state.loading = true; state.error = null; },
    fetchSuccess(state, action: PayloadAction<any[]>) { state.loading = false; state.items = action.payload; },
    fetchFailure(state, action: PayloadAction<string>) { state.loading = false; state.error = action.payload; },
  },
});

export const { fetchRequest, fetchSuccess, fetchFailure } = contentSlice.actions;
export default contentSlice.reducer;
