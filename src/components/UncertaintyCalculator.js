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
import BasicStatistic from "../libs/basicStatistic";
import { useImmer } from "use-immer";
import getAllAccessToOneValueObject from "../libs/allAccessToOneValueObject";
import ErrorNotice from "./ErrorNotice";
import useAtleastScreenSize from "../hooks/useAtleastScreenSize";
import useGetTr from "../hooks/useGetTr";

export default function UncertaintyCalculator() {
  const tr = useGetTr(["uncertainty-calculator"]);

  const initState = {
    dataRows: [],
    dataInput: 0.0,
    uncertaintyBInput: 0.0,
    sigmaInput: 1.0,
    precisionInput: 4,
  };
  const [formState, setState] = useImmer(initState);
  if (
    !useAtleastScreenSize({
      breakpoint: "md",
    })
  ) {
    return (
      <ErrorNotice
        text={
          "This app is not suitable running on this screensize. Please use devices with larger display such as PC or tablet, or you can enable desktop site mode in your browser settings."
        }
      ></ErrorNotice>
    );
  }

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
          <Button
            variant="outlined"
            onClick={addNewData}
            sx={{ textTransform: "none" }}
          >
            {tr("add")}
          </Button>
        </Box>

        <Box>
          <Button
            variant="outlined"
            onClick={clear}
            sx={{
              textTransform: "none",
            }}
          >
            {tr("clear")}
          </Button>
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
        <label htmlFor="uncertainty_B_input">
          <Typography>{tr("uncertainty-b")}:</Typography>
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
          <Typography>{tr("precision")}: </Typography>
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
              <TableCell>{tr("uncertainty-a")}</TableCell>
              <TableCell>{tr("uncertainty")}</TableCell>
              <TableCell>{tr("relative-uncertainty")}</TableCell>
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
              <TableCell>{tr("sum")}</TableCell>
              <TableCell>{tr("average")}</TableCell>
              <TableCell>{tr("population-stddev")}</TableCell>
              <TableCell>{tr("sample-stddev")}</TableCell>
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
