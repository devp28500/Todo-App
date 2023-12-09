import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
