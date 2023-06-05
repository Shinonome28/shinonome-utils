import { useEffect, useMemo } from "react";
import { Button, ButtonGroup, Box, TextField } from "@mui/material";
import { ResultStorageModifier } from "../../reducers/resultStorageReducer";
import useGetTr from "../../hooks/useGetTr";
import { Base64 } from "js-base64";

const generateBase64Decode = (type, data) => {
  const payload = {
    resultName: "base64-decode",
    getResult: () => {
      return (
        <Box key="base64-decode" sx={{ width: "100%" }}>
          <TextField
            value={Base64.decode(data.input)}
            label="BASE64 DECODE"
            disabled
            fullWidth
            multiline
          ></TextField>
        </Box>
      );
    },
  };

  ResultStorageModifier.modifyByType(data.resultStorageDispatch, payload, type);
};

const generateBase64Encode = (type, data) => {
  const payload = {
    resultName: "base64-encode",
    getResult() {
      return (
        <Box key="base64-encode" sx={{ width: "100%" }}>
          <TextField
            value={Base64.encode(data.input)}
            label="BASE64 ENCODE"
            disabled
            fullWidth
            multiline
          ></TextField>
        </Box>
      );
    },
  };
  ResultStorageModifier.modifyByType(data.resultStorageDispatch, payload, type);
};

export function Base64Part(props) {
  const tr = useGetTr("string-utils");
  const dataForGeneration = useMemo(() => {
    return {
      input: props.input,
      resultStorageDispatch: props.resultStorageDispatch,
    };
  }, [props.input, props.resultStorageDispatch]);

  useEffect(() => {
    generateBase64Decode("update", dataForGeneration);
    generateBase64Encode("update", dataForGeneration);
  }, [dataForGeneration]);

  return (
    <Box>
      <ButtonGroup
        sx={{
          mt: 2,
        }}
      >
        <Button
          onClick={() => generateBase64Encode("toggle", dataForGeneration)}
          sx={{ textTransform: "none" }}
        >
          {tr("base64-encode")}
        </Button>
        <Button
          onClick={() => generateBase64Decode("toggle", dataForGeneration)}
          sx={{ textTransform: "none" }}
        >
          {tr("base64-decode")}
        </Button>
      </ButtonGroup>
    </Box>
  );
}
