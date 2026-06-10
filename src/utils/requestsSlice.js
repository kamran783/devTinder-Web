import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "connectionsRequests",
  initialState: [],
  reducers: {
    addReqConnection: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addReqConnection, removeRequest } = requestsSlice.actions;

export default requestsSlice.reducer;
