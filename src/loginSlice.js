// // loginSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import { useLoginMutation } from "./api";

// export const loginSlice = createSlice({
//   name: "login",
//   initialState: {
//     loading: false,
//     error: null,
//     isAuthenticated: false,
//     user: null,
//   },
//   reducers: {
//     resetLoginState: (state) => {
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(useLoginMutation.pending, (state) => {
//         console.log("Login pending");
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(useLoginMutation.fulfilled, (state, action) => {
//         console.log("Login fulfilled", action.payload);
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user; // Assuming your API returns user data
//       })
//       .addCase(useLoginMutation.rejected, (state, action) => {
//         console.log("Login rejected", action.error);
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { resetLoginState } = loginSlice.actions;
// export const loginReducer = loginSlice.reducer;

// loginSlice.js

// import { useLoginMutation } from "./api";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const api = createAsyncThunk("http://localhost:5055/", async (credentials, { rejectWithValue }) => {
  try {
    // Make your API call here
    const response = await fetch("admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      // If the response status is not okay, reject the promise with the error message
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data; // Assuming your API returns some data on successful login
  } catch (error) {
    // If there's an error, reject the promise with the error message
    return rejectWithValue(error.message);
  }
});

const loginSlice = createSlice({
  name: "login",
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
      .addCase(api.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(api.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(api.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // The error message is passed as the payload when using rejectWithValue
      });
  },
});

export const { resetLoginState } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
