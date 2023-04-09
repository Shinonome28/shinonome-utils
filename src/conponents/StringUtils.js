import { Box, Button, ButtonGroup, Stack, TextField } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useReducer, useState } from "react";
import { Base64 } from "js-base64";
import resultStorageReducer from "../reducers/resultStorageReducer";
import * as resultStorageActions from "../reducers/resultStorageReducer";

function StringUtils() {
  const [stringInput, setStringInput] = useState("");
  const [resultStorage, resultStorageDispatch] = useReducer(
    resultStorageReducer,
    {}
  );

  const generateBase64Decode = () => {
    const resultName = "base64-decode";
    resultStorageDispatch(
      resultStorageActions.toggleReult({
        resultName: resultName,
        getResult: () => {
          return (
            <Box key="base64-encode">
              <TextField
                value={Base64.decode(stringInput)}
                label="BASE64 ENCODE"
                disabled
              ></TextField>
            </Box>
          );
        },
      })
    );
  };

  const generateQtCode = () => {
    const resultName = "qrcode";
    resultStorageDispatch(
      resultStorageActions.toggleReult({
        resultName: resultName,
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
      })
    );
  };

  const generateBase64Encode = () => {
    const resultName = "base64-encode";
    resultStorageDispatch(
      resultStorageActions.toggleReult({
        resultName: resultName,
        getResult() {
          return (
            <Box key="base64-encode">
              <TextField
                value={Base64.encode(stringInput)}
                label="BASE64 ENCODE"
                disabled
              ></TextField>
            </Box>
          );
        },
      })
    );
  };

  const clearAllGenerationResult = () => {
    resultStorageDispatch(resultStorageActions.clearAllResult())
  };
  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        rows={5}
        variant="standard"
        value={stringInput}
        onChange={(e) => setStringInput(e.currentTarget.value)}
        fullWidth
        multiline
      ></TextField>
      <ButtonGroup
        sx={{
          mt: 2,
        }}
      >
        <Button onClick={generateQtCode} sx={{ textTransform: "none" }}>
          QR Code
        </Button>
        <Button onClick={generateBase64Encode} sx={{ textTransform: "none" }}>
          Base64 Encode
        </Button>
        <Button onClick={generateBase64Decode} sx={{ textTransform: "none" }}>
          Base64 Decode
        </Button>
        <Button
          onClick={clearAllGenerationResult}
          sx={{ textTransform: "none" }}
        >
          Clear
        </Button>
      </ButtonGroup>
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
  );
}

export default StringUtils;
