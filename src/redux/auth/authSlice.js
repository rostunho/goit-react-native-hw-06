import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { userId: null, displayName: null },
  redusers: {},
});

// export default authSlice.reducer;
