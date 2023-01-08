import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
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

function App() {
  const [num, setNum] = useState(0);
  const [value, setValue] = useState(dayjs("2023-01-01"));
  const [leapYear, setLeapYear] = useState(false);
  const [days, setDays] = useState(0);
  // get the day name of the date
  console.log(value.format("dddd"));
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

  let tableData = [
    {
      id: 11,
      name: "Nur",
      datas: [
        { date: "01.01.2023", work: 8, id: 1 },
        { date: "02.01.2023", work: 6, id: 2 },
        { date: "03.01.2023", work: 8, id: 3 },
        { date: "04.01.2023", work: 0, id: 4 },
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

  // console.log(tableData.map((data) => data.datas));

  return (
    <div className="">
      <div
        style={{
          marginTop: "20px",
          marginLeft: "20px",
        }}
      >
        <p>Logo</p>
      </div>

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
              {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
                <TableCell>
                  {dayjs(value).date(day).format("DD.MM.YYYY")}{" "}
                  {dayjs(value).date(day).format("dddd")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((data) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>

                {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
                  <TableCell>
                    {/* 
                    { date: "01.01.2023", work: 8 },
                    { date: "02.01.2023", work: 6 },
                    { date: "03.01.2023", work: 8 },
                    { date: "04.01.2023", work: 6 },
                    */}

                    {/* if user has working hour on this day then show it else only show 0 in other fields with validation */}
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
                        .map((data) => <span>{data.work}</span>)
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
