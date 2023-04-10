import { useContext } from "react";
import { GlobalAlertMessageContext } from "../context/globalAlertMessageContext";
import { Alert, Stack } from "@mui/material";

export default function ControlledAlert() {
  const globalAlertMessageContext = useContext(GlobalAlertMessageContext);
  const messageList = globalAlertMessageContext.getState();

  if (messageList.length === 0) {
    return null;
  }

  return (
    <Stack direction="column" spacing={2}>
      {messageList.map((message) => (
        <Alert severity={message.type} key={message.id}>
          {message.message}
        </Alert>
      ))}
    </Stack>
  );
}
