// api.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseURL = "http://localhost:5055";

export const loginApi = createAsyncThunk("loginApi", async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`);
      throw new Error("Login failed");
    }

    // Check if the content-type header indicates JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      // If not JSON, handle the response accordingly (e.g., read as text)
      const textData = await response.text();
      return textData;
    }
  } catch (error) {
    console.error("Error in loginApi:", error);
    return rejectWithValue(error.message);
  }
});

const apiSlice = createSlice({
  name: "api",
  initialState: {
    loading: false,
    error: null,
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    resetLoginState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        console.log("pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.loading = false;
        state.isAuthenticated = true;
        state.info = action.payload.info;
        localStorage.setItem("token", action.payload.info.token);
        localStorage.setItem("refreshToken", action.payload.info.refresh_token);
      })
      .addCase(loginApi.rejected, (state, action) => {
        console.log("rejected");
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLoginState } = apiSlice.actions;

export const loginReducer = apiSlice.reducer;
