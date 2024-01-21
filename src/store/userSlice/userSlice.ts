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
import { AuthApiError } from "../../errors/errors";

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

export const signUpWithPasswordAsync = createAsyncThunk<
  User, // Expected return type for fulfilled promise
  SignUpWithPasswordCredentials, // Argument type
  { rejectValue: string } // Type of the rejectWithValue return value
>("user/signUpWithPasswordAsync", async (credentials, { rejectWithValue }) => {
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
    if (error instanceof AuthApiError) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("Something went wrong, please try again later");
    }
  }
});

export const signInWithPasswordAsync = createAsyncThunk<
  User, // Expected return type for fulfilled promise
  SignInWithPasswordCredentials, // Argument type
  { rejectValue: string } // Type of the rejectWithValue return value
>("user/signInWithPasswordAsync", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await fetchData<AuthResponse>(
      `${import.meta.env.VITE_SUPABASE_AUTH_URL}/token?grant_type=password`,
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
    if (error instanceof AuthApiError) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("Something went wrong, please try again later");
    }
  }
});

export const signOutAsync = createAsyncThunk(
  "user/signOutAsync",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      await fetchData(
        `${import.meta.env.VITE_SUPABASE_AUTH_URL}/logout`,
        {
          method: "POST",
          body: JSON.stringify({}),
        },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
    } catch (error) {
      return rejectWithValue("Something went wrong, please try again later");
    } finally {
      // remove JWT from local storage
      localStorage.removeItem("token");
    }
  }
);

export const verifyTokenAndFetchUserAsync = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("user/verifyTokenAndFetchUserAsync", async (token, { rejectWithValue }) => {
  try {
    const { data } = await fetchData<User>(
      `${import.meta.env.VITE_SUPABASE_AUTH_URL}/user`,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return data;
  } catch (error) {
    // remove JWT from local storage
    localStorage.removeItem("token");

    return rejectWithValue("Something went wrong, please try again later");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // sign up with email and password
    builder.addCase(signUpWithPasswordAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUpWithPasswordAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(
      signUpWithPasswordAsync.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      }
    );

    // sign in with email and password
    builder.addCase(signInWithPasswordAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signInWithPasswordAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(
      signInWithPasswordAsync.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      }
    );

    // verify token and fetch user
    builder.addCase(verifyTokenAndFetchUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyTokenAndFetchUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(verifyTokenAndFetchUserAsync.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
    });

    // sign out
    builder.addCase(signOutAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signOutAsync.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
    });
    builder.addCase(signOutAsync.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
    });
  },
});

// export const {  } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectAppRole = (state: RootState): string =>
  state.user.user?.app_metadata?.app_role;

export const userReducer = userSlice.reducer;
