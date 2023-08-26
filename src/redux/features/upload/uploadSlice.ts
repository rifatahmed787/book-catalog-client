import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// type
type IState = {
  imageUrl: string | undefined;
};

const initialState: IState = {
  imageUrl: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    imageUrl: (state, action: PayloadAction<IState>) => {
      state.imageUrl = action.payload.imageUrl;
    },
  },
});

export default authSlice.reducer;
export const { imageUrl } = authSlice.actions;
