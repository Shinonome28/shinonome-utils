import { useEffect } from "react";
import { Button, ButtonGroup, Box } from "@mui/material";
import { ResultStorageModifier } from "../../reducers/resultStorageReducer";
import useGetTr from "../../hooks/useGetTr";
import { QRCodeSVG } from "qrcode.react";
import { useMemo } from "react";

const generateQRCode = (type, data) => {
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
          <QRCodeSVG value={data.input} size={128 * 1.25}></QRCodeSVG>
        </Box>
      );
    },
  };
  ResultStorageModifier.modifyByType(data.resultStorageDispatch, payload, type);
};

export function QrcodePart(props) {
  const tr = useGetTr("string-utils");
  const dataForGeneration = useMemo(() => {
    return {
      input: props.input,
      resultStorageDispatch: props.resultStorageDispatch,
    };
  }, [props.input, props.resultStorageDispatch]);

  useEffect(() => {
    generateQRCode("update", dataForGeneration);
  }, [dataForGeneration]);

  return (
    <Box>
      <ButtonGroup
        sx={{
          mt: 2,
        }}
      >
        <Button
          onClick={() => generateQRCode("toggle", dataForGeneration)}
          sx={{ textTransform: "none" }}
        >
          {tr("qrcode-gen")}
        </Button>
      </ButtonGroup>
    </Box>
  );
}
