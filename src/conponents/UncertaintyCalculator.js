import {
  TextField,
  Box,
  Button,
  Stack,
  Typography,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  Table,
  TableRow,
  TableBody,
} from "@mui/material";
import { useContext, useState } from "react";
import BasicStatistic from "../libs/basic_statistic";
import { AlertMessageModifiers } from "../reducers/alertMessageReducer";
import { GlobalAlertMessageContext } from "../context/globalAlertMessageContext";

export default function UncertaintyCalculator() {
  const [dataRows, setDataRows] = useState([9.77, 9.88]);
  const [dataInput, setDataInput] = useState("");
  const [uncertaintyBInput, setUncertaintyBInput] = useState(0.0);
  const [sigmaInput, setSigmaInput] = useState(1.0);
  const [precisionInput, setPrecisionInput] = useState(4);
  const globalAlertMessageContext = useContext(GlobalAlertMessageContext);

  const toFloat = (number) => {
    const result = parseFloat(number);
    if (isNaN(result)) {
      AlertMessageModifiers.addMessage(
        globalAlertMessageContext.dispatch,
        "error",
        "You don't input a valid number!"
      );
      return NaN;
    }
    return result;
  };

  const addNewData = () => {
    const dataInputAsFloat = toFloat(dataInput);
    setDataInput("");
    if (isNaN(dataInputAsFloat)) return;
    setDataRows(dataRows.concat(dataInputAsFloat));
  };

  let statisticResult = BasicStatistic.compute(dataRows, {
    precision: toFloat(precisionInput),
    computeUncertainty: true,
    uncertainty_B: toFloat(uncertaintyBInput),
    sigma: toFloat(sigmaInput),
  });

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <TextField
            variant="standard"
            sx={{ mr: 2 }}
            value={dataInput}
            onChange={(e) => setDataInput(e.currentTarget.value)}
          ></TextField>
          <Button variant="outlined" onClick={addNewData}>
            Add
          </Button>
        </Box>

        <Box>
          <Button variant="outlined">Clear</Button>
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
        <label htmlFor="uncertainty_B_input">
          <Typography>Uncertainty B:</Typography>
        </label>
        <TextField
          id="uncertainty_B_input"
          variant="standard"
          value={uncertaintyBInput}
          onChange={(e) => setUncertaintyBInput(e.currentTarget.value)}
        ></TextField>
        <label htmlFor="sigma-input">
          <Typography>Sigma:</Typography>
        </label>
        <TextField
          id="sigma-input"
          variant="standard"
          value={sigmaInput}
          onChange={(e) => setSigmaInput(e.currentTarget.value)}
        ></TextField>
        <label htmlFor="precision_input">
          <Typography>Precision: </Typography>
        </label>
        <TextField
          id="precision_input"
          variant="standard"
          value={precisionInput}
          onChange={(e) => setPrecisionInput(e.currentTarget.value)}
        ></TextField>
      </Stack>

      <TableContainer component={Paper} sx={{ mt: 6 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows.map((item, index) => (
              <TableRow key={`row-${index}`}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{item}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} sx={{ mt: 6 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Uncertainty A</TableCell>
              <TableCell>Uncertainty</TableCell>
              <TableCell>Relative Uncertainty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{statisticResult.uncertainty_A}</TableCell>
              <TableCell>{statisticResult.uncertainty}</TableCell>
              <TableCell>
                {statisticResult.relativeUncertaintyInPercent}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sum</TableCell>
              <TableCell>Average</TableCell>
              <TableCell>Population Standard Derivation</TableCell>
              <TableCell>Sample Standard Derviation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{statisticResult.sum}</TableCell>
              <TableCell>{statisticResult.average}</TableCell>
              <TableCell>{statisticResult.sample_standard_deviation}</TableCell>
              <TableCell>
                {statisticResult.population_standard_deviation}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
