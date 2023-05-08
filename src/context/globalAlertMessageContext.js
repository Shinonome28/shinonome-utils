import { createContext, useReducer } from "react";
import alertMessageReducer from "../reducers/alertMessageReducer";

export const GlobalAlertMessageContext = createContext();

export default function GlobalAlertMessageContextProvider(props) {
  const [globalAlertMessages, globalAlertMessagesDispatch] = useReducer(
    alertMessageReducer,
    []
  );
  return (
    <GlobalAlertMessageContext.Provider
      value={{
        getState: () => globalAlertMessages,
        dispatch: globalAlertMessagesDispatch,
      }}
    >
      {props.children}
    </GlobalAlertMessageContext.Provider>
  );
}
