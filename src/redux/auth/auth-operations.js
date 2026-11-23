import { createAsyncThunk } from "@reduxjs/toolkit";

// Frontend-only session until the authentication API is connected.
export const logIn = createAsyncThunk("auth/login", async ({ email }) => ({
  user: { email }, token: null,
}));

export const register = createAsyncThunk("auth/register", async ({ name, email }) => ({
  user: { name, email }, token: null,
}));
