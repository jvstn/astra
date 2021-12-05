import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncInitialState } from "../../store/hooks";
import { RootState } from "../../store/store";
interface AuthState extends AsyncInitialState {
  isAuthenticated: boolean;
  token: string;
  userId: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: "",
  userId: "",
  loading: "idle",
  error: null,
};

export const createUser = createAsyncThunk<
  any,
  { username: string; password: string },
  { state: RootState }
>("auth/createUser", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post("/user/create", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk<
  any,
  { username: string; password: string },
  { state: RootState }
>("auth/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post("/user/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.userId = "";
    },
  },
  extraReducers: (builder) => {
    // createUser
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.loading = "succeeded";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    // login
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = "pending";
    }
    );
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.loading = "succeeded";
    }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message as string;
    }
    );
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
