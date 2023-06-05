import { Box, Stack, TextField, Tab, Tabs } from "@mui/material";
import { CaeserCodePart } from "./StringUtilParts/caeserCodePart";
import { useReducer, useState } from "react";
import resultStorageReducer from "../reducers/resultStorageReducer";
import * as ResultStorageModifier from "../reducers/resultStorageReducer";
import useGetTr from "../hooks/useGetTr";
import { QrcodePart } from "./StringUtilParts/qrcodePart";
import { Base64Part } from "./StringUtilParts/base64Part";

function TabPanel(props) {
  return (
    <div hidden={props.value !== props.index} id={`tabpanel-${props.index}`}>
      {props.value === props.index && props.children}
    </div>
  );
}

function StringUtils() {
  const [stringInput, setStringInput] = useState("");
  const [resultStorage, resultStorageDispatch] = useReducer(
    resultStorageReducer,
    {}
  );
  const [tabPannelIndex, setTabPannelIndex] = useState(0);

  const tr = useGetTr("string-utils");

  const clearAllResult = () => {
    ResultStorageModifier.modifyByType(resultStorageDispatch, null, "clearAll");
  };

  const onInputFieldChange = (value) => {
    setStringInput(value);
    if (stringInput === "") {
      clearAllResult();
    }
  };

  const onPanelChange = (value) => {
    if (value !== tabPannelIndex) {
      setTabPannelIndex(value);
      clearAllResult();
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        rows={5}
        variant="standard"
        value={stringInput}
        onChange={(event) => onInputFieldChange(event.currentTarget.value)}
        fullWidth
        multiline
      ></TextField>

      <Box>
        <Tabs
          value={tabPannelIndex}
          onChange={(_, value) => onPanelChange(value)}
        >
          <Tab label={tr("qrcode-tools")}></Tab>
          <Tab label={tr("base64-tools")}></Tab>
          <Tab label={tr("caeser-code-tools")}></Tab>
        </Tabs>

        <TabPanel value={tabPannelIndex} index={0}>
          <QrcodePart
            resultStorageDispatch={resultStorageDispatch}
            input={stringInput}
          ></QrcodePart>
        </TabPanel>

        <TabPanel value={tabPannelIndex} index={1}>
          <Base64Part
            resultStorageDispatch={resultStorageDispatch}
            input={stringInput}
          ></Base64Part>
        </TabPanel>

        <TabPanel value={tabPannelIndex} index={2}>
          <CaeserCodePart
            resultStorageDispatch={resultStorageDispatch}
            input={stringInput}
          ></CaeserCodePart>
        </TabPanel>
      </Box>

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
