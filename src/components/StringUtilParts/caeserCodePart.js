import { useState, useEffect, useMemo } from "react";
import { caeserEncode, caeserDecode } from "../../libs/caeserCode";
import {
  Button,
  ButtonGroup,
  TextField,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { ResultStorageModifier } from "../../reducers/resultStorageReducer";
import useGetTr from "../../hooks/useGetTr";

const generateCaeserEncode = (type, data) => {
  const payload = {
    resultName: "caeser-encode",
    getResult: () => {
      return (
        <Box key="caeser-encode" sx={{ width: "100%" }}>
          <TextField
            value={caeserEncode(data.input, data.shift)}
            label="CAESER64-ENCODE"
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

const generateCaeserDecode = (type, data) => {
  const payload = {
    resultName: "caeser-decode",
    getResult: () => {
      return (
        <Box key="caeser-decode" sx={{ width: "100%" }}>
          <TextField
            value={caeserDecode(data.input, data.shift)}
            label="CAESER64-DECODE"
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

export function CaeserCodePart(props) {
  const tr = useGetTr("string-utils");
  const [shift, setShift] = useState(1);
  const dataForGeneration = useMemo(() => {
    return {
      input: props.input,
      resultStorageDispatch: props.resultStorageDispatch,
      shift: shift,
    };
  }, [props.input, props.resultStorageDispatch, shift]);

  useEffect(() => {
    generateCaeserEncode("update", dataForGeneration);
  }, [dataForGeneration]);

  const onInputFieldChange = (value) => {
    setShift(value);
    generateCaeserEncode("update", dataForGeneration);
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignContent="flex-start"
        justifyContent="space-between"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            columnGap: "5px",
          }}
        >
          <label htmlFor="caesercode-shift-input">
            <Typography>Shift: </Typography>
          </label>
          <TextField
            id="caesercode-shift-input"
            variant="standard"
            value={shift}
            onChange={(e) => onInputFieldChange(e.currentTarget.value)}
          ></TextField>
        </Box>

        <ButtonGroup>
          <Button
            onClick={(e) => generateCaeserEncode("toggle", dataForGeneration)}
          >
            {tr("generate-caeser-code")}
          </Button>
          <Button
            onClick={(e) => generateCaeserDecode("toggle", dataForGeneration)}
          >
            {tr("generate-caeser-decode")}
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
}
