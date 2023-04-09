import { createSlice } from "@reduxjs/toolkit";

const resultStorageReducer = createSlice({
  name: "resultStorage",
  initialState: {},
  reducers: {
    updateResult(state, action) {
      const { resultName, getResult } = action.payload;
      state[resultName] = getResult(resultName);
    },
    toggleReult(state, action) {
      const { resultName, getResult } = action.payload;
      if (resultName in state) {
        delete state[resultName];
      } else {
        state[resultName] = getResult(resultName);
      }
    },
    clearResult(state, action)
    {
        const {resultName} = action.payload;
        delete state[resultName];
    },
    clearAllResult(state, action)
    {
        return {}
    },
  },
});

export function isReusltInStorage(state, resultName)
{
    return resultName in state;
}

export default resultStorageReducer.reducer;
export const {toggleReult, updateResult, clearAllResult, clearResult} = resultStorageReducer.actions;

