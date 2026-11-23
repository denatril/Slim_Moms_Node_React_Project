import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/auth-slice";

import diary from "./diary";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    diary,
  },
});
