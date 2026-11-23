import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "";

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      // const { data } = await axios.post('/users/login', credentials);
      // return data;
      return {
        user: { email: credentials.email },
        token: null,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
