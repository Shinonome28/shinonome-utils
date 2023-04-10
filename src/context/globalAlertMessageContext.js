import { createContext, useReducer } from "react";
import alertMessageReducer from "../reducers/alertMessageReducer";

export const GlobalAlertMessageContext = createContext();

function GlobalAlertMessageContextProvider(props) {
  const [globalAlertMessages, globalAlertMessagesDispatch] = useReducer(
    alertMessageReducer,
    []
  );
  return (
    <GlobalAlertMessageContext.Provider
      value={{
        getState: () => globalAlertMessages,
        dispatch: globalAlertMessagesDispatch,
        test: "a test",
      }}
    >
      {props.children}
    </GlobalAlertMessageContext.Provider>
  );
}

export default GlobalAlertMessageContextProvider;
