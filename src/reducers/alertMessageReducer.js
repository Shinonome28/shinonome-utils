import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const alertMessageSlice = createSlice({
  name: "AlertMessage",
  initialState: [],
  reducers: {
    addMessage(state, action) {
      state.push(action.payload);
    },
    clearMessage(state, action) {
      return state.filter((r) => r.id !== action.payload.id);
    },
  },
});

function addMessage(dispatch, type, message, seconds = 5) {
  const id = uuidv4();
  const payload = { type, message, id };
  dispatch(alertMessageSlice.actions.addMessage(payload));
  if (seconds > 0) {
    setTimeout(() => {
      dispatch(alertMessageSlice.actions.clearMessage(payload));
    }, seconds * 1000);
  }
  return id;
}

function clearMessage(dispatch, id) {
  dispatch(alertMessageSlice.actions.clearMessage({ id }));
}

export default alertMessageSlice.reducer;
export const AlertMessageModifiers = {
  addMessage,
  clearMessage,
};
