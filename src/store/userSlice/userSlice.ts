import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

// I do not use the supabase client in the app, the client is installed only because it provides TS types.
// The supabase client is not tree shakeable and thats why its imported as a type-only import.
// Type-only imports are not emitted in the compiled JS. They get erased at compile time when transpiling to JS.
// Therefore the supabase client is not included in the final bundle because there is no import statement that references it when transpiled to JS.
import type {
  User,
  SignUpWithPasswordCredentials,
  SignInWithPasswordCredentials,
} from "@supabase/supabase-js";
import { AuthResponse } from "../../types/dataTypes";
import { ApiError } from "../../errors/ApiError";

import { fetchData } from "../../utils/dataUtils";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const signUpWithPasswordAsync = createAsyncThunk(
  "user/signUpWithPasswordAsync",
  async (credentials: SignUpWithPasswordCredentials, { rejectWithValue }) => {
    try {
      const { data } = await fetchData<AuthResponse>(
        `${import.meta.env.VITE_SUPABASE_AUTH_URL}/signup`,
        {
          method: "POST",
          body: JSON.stringify(credentials),
        },
        {
          "Content-Type": "application/json",
        }
      );

      // add JWT to local storage
      localStorage.setItem("token", data.access_token);

      return data.user;
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 400) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Something went wrong, please try again later");
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpWithPasswordAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpWithPasswordAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(signUpWithPasswordAsync.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
  },
});

// export const {  } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
