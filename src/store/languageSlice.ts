import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {switchLanguageApi} from '../api/languageApi';

type Language = 'english' | 'hindi';

interface LanguageState {
  language: Language;
  loading: boolean;
  error: string | null;
}

const initialState: LanguageState = {
  language: 'english',
  loading: false,
  error: null,
};

export const switchLanguage = createAsyncThunk(
  'language/switch',
  async (newLanguage: Language, {rejectWithValue}) => {
    try {
      await switchLanguageApi(newLanguage);
      return newLanguage;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to switch language');
    }
  },
);

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(switchLanguage.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(switchLanguage.fulfilled, (state, action) => {
        state.loading = false;
        state.language = action.payload;
      })
      .addCase(switchLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setLanguage, clearError} = languageSlice.actions;
export default languageSlice.reducer;
