import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CSVLink } from "react-csv";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// const doc = new jsPDF();

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "80%",
    margin: theme.spacing(1, 0),
  },
}));
function App() {
  const classes = useStyles();
  const num = 0;

  // const [num, setNum] = useState(0);

  const [value, setValue] = useState(dayjs("2023-01-01"));
  const [leapYear, setLeapYear] = useState(false);
  const [days, setDays] = useState(0);
  // get the day name of the date
  // console.log(value.format("dddd"));
  // get the month name of the date
  const month = value?.format("MMMM");
  // get the year of the date
  const year = value?.format("YYYY");
  function isLeapYear(year) {
    if (year % 4 !== 0) {
      setLeapYear(false);
      return;
    } else if (year % 100 !== 0) {
      setLeapYear(true);
      return;
    } else if (year % 400 !== 0) {
      setLeapYear(false);
      return;
    } else {
      setLeapYear(true);
    }
  }
  const howManyDays = (month) => {
    switch (month) {
      case "January":
        setDays(31);
        return;
      case "February":
        if (leapYear) {
          setDays(29);
          return;
        } else {
          setDays(28);
          return;
        }
      case "March":
        setDays(31);
        return;
      case "April":
        setDays(30);
        return;
      case "May":
        setDays(31);
        return;
      case "June":
        setDays(30);
        return;
      case "July":
        setDays(31);
        return;
      case "August":
        setDays(31);
        return;
      case "September":
        setDays(30);
        return;
      case "October":
        setDays(31);
        return;
      case "November":
        setDays(30);
        return;
      case "December":
        setDays(31);
        return;
      default:
        setDays(0);
        return 0;
    }
  };
  useEffect(() => {
    isLeapYear(year);
    howManyDays(month);
  }, [leapYear, year, month]);

  // function createData(name, datas) {
  //   return { name, datas };
  // }
  // Nafisa
  const [updateName, setUpdateName] = useState([]);
  const [allWorkingHour, setAllWorkingHour] = useState(null);
  // const [allWorkingDays, setAllWorkingDays] = useState(null);
  const [open, setOpen] = useState(false);

  const handleUpdate = () => {
    setOpen(false);
    console.log(allWorkingHour);
  };

  // const dates = Array.from({ length: days }, (_, i) => i + 1).map((day) => {
  //   const datetime = dayjs(value).date(day).format("DD.MM.YYYY");
  //   const dayname = dayjs(value).date(day).format("dddd");
  //   return datetime;
  // });
  // console.log(dates.join());

  //  {
  //    Array.from({ length: days }, (_, i) => i + 1).map((day) => (
  //      <TableCell>
  //        {dayjs(value).date(day).format("DD.MM.YYYY")}{" "}
  //        {dayjs(value).date(day).format("dddd")}
  //      </TableCell>
  //    ));
  //  }

  // const handleExport = () => {
  //   doc.text("Hello world!", 100, 100);
  //   doc.autoTable({
  //     head: [["Name", dates.join(","), "total"]],
  //     body: [
  //       ["Nur", "01.01.2023", 8, 8],
  //       ["Nur", "02.01.2023", 6, 14],
  //     ],
  //   });
  //   doc.save("export-data.pdf");
  // };

  const handleSubmit = (event) => {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  };

  let tableData = [
    {
      id: 11,
      name: "Nur",
      datas: [
        { date: "01.01.2023", work: 8, id: 1 },
        { date: "02.01.2023", work: 6, id: 2 },
        { date: "03.01.2023", work: 8, id: 3 },
        { date: "04.01.2023", work: 0, id: 4 },
        { date: "05.01.2023", work: 6, id: 5 },
      ],
    },
    {
      id: 12,
      name: "Mohammod",
      datas: [
        { date: "01.01.2023", work: 8, id: 1 },
        { date: "02.01.2023", work: 6, id: 2 },
      ],
    },
    {
      id: 13,
      name: "Abdur",
      datas: [
        { date: "01.01.2023", work: 8, id: 1 },
        { date: "02.01.2023", work: 6, id: 2 },
      ],
    },
    {
      id: 14,
      name: "Rahim",
      datas: [
        { date: "01.01.2023", work: 8, id: 1 },
        { date: "02.01.2023", work: 6, id: 2 },
      ],
    },
  ];
  const [totalHoursData, setTotalHoursData] = useState([]);
  useEffect(() => {
    const result = tableData.map((data) => {
      let TotalHours = 0;

      let object = {};
      Array.from({ length: days }, (_, i) => i + 1).map((day, index) => {
        const datetime = dayjs(value).date(day).format("DD.MM.YYYY");
        const workTime = data.datas.filter((a) => a.date === datetime);

        if (workTime.length > 0) {
          workTime.map((a) => {
            return (TotalHours += a.work);
          });
        }
      });
      setTotalHoursData((prev) => [...prev, TotalHours]);
      return TotalHours;
    });
  }, [days, value]);
  // console.log(totalHoursData);

  let finalTotal = 0;
  const csvArrayData = tableData.map((data) => {
    let totalHour = 0;
    let object = {};
    Array.from({ length: days }, (_, i) => i + 1).map((day, index) => {
      const datetime = dayjs(value).date(day).format("DD.MM.YYYY");
      const dayname = dayjs(value).date(day).format("dddd");
      const dateandday = `${datetime} ${dayname}`;
      const workTime = data.datas.filter((a) => a.date === datetime);

      if (workTime.length > 0) {
        workTime.map((a) => {
          return (totalHour += a.work);
        });
      }

      index + 1 !== days
        ? (object = {
            ...object,
            name: data.name,
            [`${dateandday}`]: workTime[0]?.work || 0,
          })
        : (object = {
            ...object,
            name: data.name,
            [`${dateandday}`]: workTime[0]?.work || 0,
            total: totalHour,
          });
    });
    finalTotal += totalHour;
    return object;
  });
  const finalCsvArray = [
    ...csvArrayData,
    { total: `FinalTotal: ${finalTotal}` },
  ];
  // console.log(finalCsvArray);
  const handleChange = (name) => {
    const change = tableData.filter((a) => a.name === name);
    setUpdateName(change[0].datas);
    console.log(updateName);
  };

  return (
    <div className="">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          mt: 2,
        }}
      >
        <div
          style={{
            // marginTop: "20px",
            marginLeft: "20px",
          }}
        >
          <p>Logo</p>
        </div>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <CSVLink
            className=" btn btn-primary me-4 "
            style={{
              textDecoration: "none",
            }}
            data={finalCsvArray}
          >
            <Button
              sx={{
                textDecoration: "none",
              }}
            >
              Export
            </Button>
          </CSVLink>
          <Button>Add New Person</Button>
          <Button onClick={() => setOpen(true)}>Update</Button>
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DatePicker
              views={["year", "month"]}
              label="Year and Month"
              minDate={dayjs("2012-03-01")}
              maxDate={dayjs("2023-06-01")}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </Stack>
        </LocalizationProvider>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  minWidth: "150px",
                }}
              >
                Person Name
              </TableCell>

              {/* make an array */}
              {Array.from({ length: days }, (_, i) => i + 1).map((day, i) => (
                <TableCell key={i}>
                  {dayjs(value).date(day).format("DD.MM.YYYY")}{" "}
                  {dayjs(value).date(day).format("dddd")}
                </TableCell>
              ))}
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((data, i) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={i}
              >
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                {Array.from({ length: days }, (_, i) => i + 1).map((day, i) => (
                  <TableCell key={i}>
                    {data.datas.filter(
                      (data) =>
                        data.date ===
                        dayjs(value).date(day).format("DD.MM.YYYY")
                    ).length > 0 ? (
                      data.datas
                        .filter(
                          (data) =>
                            data.date ===
                            dayjs(value).date(day).format("DD.MM.YYYY")
                        )
                        .map((data, i) => <span key={i}>{data.work}</span>)
                    ) : (
                      <span
                        onClick={() => {
                          console.log(data.name);
                          console.log(
                            dayjs(value).date(day).format("DD.MM.YYYY")
                          );
                        }}
                      >
                        0
                      </span>
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  {/* total in every single month separetly */}
                  {data.datas && data.datas.length > 0 ? (
                    data.datas.map((data) => data.work).reduce((a, b) => a + b)
                  ) : (
                    // data.datas.map((data) => data.work).reduce((a, b) => a + b)
                    <span>0</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {/* Added fixed row for total */}
            <TableRow>
              <TableCell
                style={{ textAlign: "right", marginRight: "20px" }}
                colSpan={34}
              >
                Total: <span style={{ fontWeight: "bold" }}>{finalTotal}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Update Your Information</DialogTitle>
        <DialogContentText id="dialog-description">
          {/* Details */}
          <>
            <FormControl
              fullWidth
              className={classes.inputField}
              onSubmit={handleSubmit}
            >
              <InputLabel id="demo-simple-select-label">Name</InputLabel>

              <Select
                onChange={(e) => handleChange(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                {tableData.map((data, i) => (
                  <MenuItem value={data.name} key={i}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
          <Box>
            <FormControl
              fullWidth
              className={classes.inputField}
              onSubmit={handleSubmit}
            >
              <InputLabel id="demo-simple-select-label">
                Working Hour
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                {updateName.map((data, i) => (
                  <MenuItem value={data.work} key={i}>
                    {" "}
                    {data.work}
                  </MenuItem>
                ))}
              </Select>
              <Input
                onChange={(e) => setAllWorkingHour(e.target.value)}
              ></Input>
            </FormControl>
          </Box>
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button autoFocus onClick={() => handleUpdate()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
