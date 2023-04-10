import { createSlice } from "@reduxjs/toolkit";

const resultStorageReducer = createSlice({
  name: "resultStorage",
  initialState: {},
  reducers: {
    updateResult(state, action) {
      const { resultName, getResult } = action.payload;
      if (resultName in state) {
        state[resultName] = getResult(resultName);
      }
    },
    toggleReult(state, action) {
      const { resultName, getResult } = action.payload;
      if (resultName in state) {
        delete state[resultName];
      } else {
        state[resultName] = getResult(resultName);
      }
    },
    addResult(state, action) {
      const { resultName, getResult } = action.payload;
      state[resultName] = getResult(resultName);
    },
    clearResult(state, action) {
      const { resultName } = action.payload;
      delete state[resultName];
    },
    clearAllResult(state, action) {
      return {};
    },
  },
});

export function isReusltInStorage(state, resultName) {
  return resultName in state;
}

export function modifyByType(dispatch, action, type) {
  switch (type) {
    case "toggle":
      dispatch(resultStorageReducer.actions.toggleReult(action));
      return;
    case "update":
      dispatch(resultStorageReducer.actions.updateResult(action));
      return;
    case "add":
      dispatch(resultStorageReducer.actions.addResult(action));
      return;
    case "clear":
      dispatch(resultStorageReducer.actions.clearResult(action));
      return;
    case "clearAll":
      dispatch(resultStorageReducer.actions.clearAllResult(action));
      return;
    default:
      return;
  }
}

export default resultStorageReducer.reducer;
export const ResultStorageModifier = {
  modifyByType,
};
