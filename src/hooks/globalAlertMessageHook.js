import { useContext } from "react";
import { GlobalAlertMessageContext } from "../context/globalAlertMessageContext";
import { AlertMessageModifiers } from "../reducers/alertMessageReducer";

export function useAddGlobalAlertMessage() {
  const dispatch = useContext(GlobalAlertMessageContext).dispatch;
  return (type, message, seconds) => {
    AlertMessageModifiers.addMessage(dispatch, type, message, seconds);
  };
}

export function useClearGlobalAlertMessage() {
  const dispatch = useContext(GlobalAlertMessageContext).dispatch;
  return (id) => {
    AlertMessageModifiers.clearMessage(dispatch, id);
  };
}
