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
import BasicStatistic from "../libs/basic_statistic";
import { useImmer } from "use-immer";
import getAllAccessToOneValueObject from "../libs/allAccessToOneValueObject";

export default function UncertaintyCalculator() {
  const initState = {
    dataRows: [],
    dataInput: 0.0,
    uncertaintyBInput: 0.0,
    sigmaInput: 1.0,
    precisionInput: 4,
  };
  const [formState, setState] = useImmer(initState);

  const setDataInput = (str) => {
    setState((draft) => {
      draft.dataInput = str;
    });
  };

  const setUncertaintyBInput = (str) => {
    setState((draft) => {
      draft.uncertaintyBInput = str;
    });
  };

  const setPrecisionInput = (str) => {
    setState((draft) => {
      draft.precisionInput = str;
    });
  };

  const setSigmaInput = (str) => {
    setState((draft) => {
      draft.sigmaInput = str;
    });
  };

  const addNewData = () => {
    if (isNaN(parseFloat(formState.dataInput))) return;
    setState((draft) => {
      draft.dataRows.push(draft.dataInput);
    });
  };

  const clear = () => {
    setState((draft) => {
      draft.dataRows = [];
    });
  };

  // this is the state tranformed from the form state
  // that all to float, to really represent the app's state
  const state = {
    dataRows: formState.dataRows.map((r) => parseFloat(r)),
    precision: parseFloat(formState.precisionInput),
    uncertaintyB: parseFloat(formState.uncertaintyBInput),
    sigma: parseFloat(formState.sigmaInput),
  };

  const isInErrorState = (state) => {
    return (
      isNaN(state.uncertaintyB) ||
      isNaN(state.sigma) ||
      isNaN(state.precision) ||
      state.dataRows.filter((r) => isNaN(r)).length !== 0
    );
  };

  let statisticResult =
    isInErrorState(state) || state.dataRows.length === 0
      ? getAllAccessToOneValueObject("NaN")
      : BasicStatistic.compute(state.dataRows, {
          precision: state.precision,
          computeUncertainty: true,
          uncertaintyB: state.uncertaintyB,
          sigma: state.sigma,
        });

  // const [dataRows, setDataRows] = useState([9.77, 9.88]);
  // const [dataInput, setDataInput] = useState("");
  // const [uncertaintyBInput, setUncertaintyBInput] = useState(0.0);
  // const [sigmaInput, setSigmaInput] = useState(1.0);
  // const [precisionInput, setPrecisionInput] = useState(4);
  // const addGlobalAlertMessage = useAddGlobalAlertMessage();

  // const toFloat = (number) => {
  //   const result = parseFloat(number);
  //   if (isNaN(result)) {
  //     addGlobalAlertMessage("error", `You input a invalid number: ${number}!`);
  //     return NaN;
  //   }
  //   return result;
  // };

  // const addNewData = () => {
  //   const dataInputAsFloat = toFloat(dataInput);
  //   setDataInput("");
  //   if (isNaN(dataInputAsFloat)) return;
  //   setDataRows(dataRows.concat(dataInputAsFloat));
  // };

  // make the input safe
  // const makeComputeConfig = () => {
  //   const config = {
  //     precision: toFloat(precisionInput),
  //     computeUncertainty: true,
  //     uncertainty_B: toFloat(uncertaintyBInput),
  //     sigma: toFloat(sigmaInput),
  //   };
  //   if (
  //     isNaN(config.uncertainty_B) ||
  //     isNaN(config.sigma) ||
  //     isNaN(config.precision)
  //   ) {
  //     return null;
  //   }
  //   return config;
  // };

  // const computeConfig = makeComputeConfig();

  // const clear = () => {
  //   setDataRows([]);
  // };

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
            value={formState.dataInput}
            onChange={(e) => setDataInput(e.currentTarget.value)}
          ></TextField>
          <Button variant="outlined" onClick={addNewData}>
            Add
          </Button>
        </Box>

        <Box>
          <Button variant="outlined" onClick={clear}>
            Clear
          </Button>
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
        <label htmlFor="uncertainty_B_input">
          <Typography>Uncertainty B:</Typography>
        </label>
        <TextField
          id="uncertainty_B_input"
          variant="standard"
          value={formState.uncertaintyBInput}
          onChange={(e) => setUncertaintyBInput(e.currentTarget.value)}
        ></TextField>
        <label htmlFor="sigma-input">
          <Typography>Sigma:</Typography>
        </label>
        <TextField
          id="sigma-input"
          variant="standard"
          value={formState.sigmaInput}
          onChange={(e) => setSigmaInput(e.currentTarget.value)}
        ></TextField>
        <label htmlFor="precision_input">
          <Typography>Precision: </Typography>
        </label>
        <TextField
          id="precision_input"
          variant="standard"
          value={formState.precisionInput}
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
            {formState.dataRows.map((item, index) => (
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
              <TableCell>{statisticResult.uncertaintyA}</TableCell>
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
              <TableCell>
                {statisticResult.population_standard_deviation}
              </TableCell>
              <TableCell>{statisticResult.sample_standard_deviation}</TableCell>{" "}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
