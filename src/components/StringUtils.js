import { Box, Button, ButtonGroup, Stack, TextField } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useReducer, useState } from "react";
import { Base64 } from "js-base64";
import resultStorageReducer from "../reducers/resultStorageReducer";
import * as ResultStorageModifier from "../reducers/resultStorageReducer";
import useGetTr from "../hooks/useGetTr";

function StringUtils() {
  const [stringInput, setStringInput] = useState("");
  const [resultStorage, resultStorageDispatch] = useReducer(
    resultStorageReducer,
    {}
  );

  const tr = useGetTr("string-utils");

  const generateBase64Decode = (type) => {
    const payload = {
      resultName: "base64-decode",
      getResult: () => {
        return (
          <Box key="base64-decode" sx={{ width: "100%" }}>
            <TextField
              value={Base64.decode(stringInput)}
              label="BASE64 DECODE"
              disabled
              fullWidth
              multiline
            ></TextField>
          </Box>
        );
      },
    };

    ResultStorageModifier.modifyByType(resultStorageDispatch, payload, type);
  };

  const generateQRCode = (type) => {
    const payload = {
      resultName: "qrcode",
      getResult: () => {
        return (
          <Box
            key="qrcode"
            sx={{
              borderWidth: 1,
              backgroundColor: "white",
              padding: 1,
              paddingBottom: 0,
            }}
          >
            <QRCodeSVG value={stringInput} size={128 * 1.25}></QRCodeSVG>
          </Box>
        );
      },
    };
    ResultStorageModifier.modifyByType(resultStorageDispatch, payload, type);
  };

  const generateBase64Encode = (type) => {
    const payload = {
      resultName: "base64-encode",
      getResult() {
        return (
          <Box key="base64-encode" sx={{ width: "100%" }}>
            <TextField
              value={Base64.encode(stringInput)}
              label="BASE64 ENCODE"
              disabled
              fullWidth
              multiline
            ></TextField>
          </Box>
        );
      },
    };
    ResultStorageModifier.modifyByType(resultStorageDispatch, payload, type);
  };

  const clearAll = () => {
    ResultStorageModifier.modifyByType(resultStorageDispatch, null, "clearAll");
    setStringInput("");
  };

  const onInputFieldChange = (event) => {
    setStringInput(event.currentTarget.value);
    generateBase64Decode("update");
    generateBase64Encode("update");
    generateQRCode("update");
  };
  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        rows={5}
        variant="standard"
        value={stringInput}
        onChange={onInputFieldChange}
        fullWidth
        multiline
      ></TextField>
      <ButtonGroup
        sx={{
          mt: 2,
        }}
      >
        <Button
          onClick={() => generateQRCode("toggle")}
          sx={{ textTransform: "none" }}
        >
          {tr("qrcode-gen")}
        </Button>
        <Button
          onClick={() => generateBase64Encode("toggle")}
          sx={{ textTransform: "none" }}
        >
          {tr("base64-encode")}
        </Button>
        <Button
          onClick={() => generateBase64Decode("toggle")}
          sx={{ textTransform: "none" }}
        >
          {tr("base64-decode")}
        </Button>
        <Button onClick={clearAll} sx={{ textTransform: "none" }}>
          {tr("clear")}
        </Button>
      </ButtonGroup>
      <Box sx={{ width: "100%" }}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={4}
          sx={{ mt: 3 }}
        >
          {Object.keys(resultStorage).map((item) => {
            console.log("rendering ", item);
            return resultStorage[item];
          })}
        </Stack>
      </Box>
    </Box>
  );
}

export default StringUtils;
