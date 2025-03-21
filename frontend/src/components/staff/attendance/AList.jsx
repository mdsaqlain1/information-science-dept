/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import IconButton from "@mui/joy/IconButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import RuleIcon from "@mui/icons-material/Rule";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import Groups2Icon from "@mui/icons-material/Groups2";
import SubjectIcon from "@mui/icons-material/Subject";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRecoilState } from "recoil";
import {
  classAtom,
  currentSelectedCourse as currentSelectedCourseAtom,
} from "../../../../recoil/atoms/classAtom";
import axios from "axios";
import { BACKEND_URL } from "../../../../globals";
import StudentListForAttendance from "./temp/StudentListForAttendance";
import {
  studentListState,
  isUpdateOrEditAttendanceStateAtom,
  attendanceType,
} from "../../../../recoil/atoms/attendanceAtom";

export default function Alist() {
  const [studentList, setStudentList] = useRecoilState(studentListState);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [currentSelectedCourse, setCurrentSelectedCourse] = useRecoilState(
    currentSelectedCourseAtom
  );
  const [attendanceList, setAttendanceList] = useState([]);
  const [isUpdateOrEditAttendanceState, setIsUpdateOrEditAttendanceState] =
    useRecoilState(isUpdateOrEditAttendanceStateAtom);
  const [studentListForAttendace, setStudentListForAttendace] = useState([]);
  const handleDeleteAttendance = async (id) => {
    //TODO: try doing the deletion in frontend first and then backend for better and faster response.. store the old date temp var and rol back to it if any error occured while sending a error message to the user
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/staff/attendanceList/${id}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      fecthAttendanceList();
      handleClose();
    }
  };
  const [type, setType] = useRecoilState(attendanceType);

  const handleEditOption = async (id) => {
    setType("update");
    //TODO: try doing the deletion in frontend first and then backend for better and faster response.. store the old date temp var and rol back to it if any error occured while sending a error message to the user
    try {
      const response = await axios.get(
        `${BACKEND_URL}/staff/studentListWithAttendance/${id}`
      );
      console.log(response.data.data);
      setIsUpdateOrEditAttendanceState(true);
      setStudentList(response.data.data);
    } catch (error) {
      console.log("failed to edit the attedance");
    }
  };
  const fecthAttendanceList = useCallback(async () => {
    try {
      // console.log(currentSelectedCourse);
      const token = localStorage.getItem("token");
      // console.log(currentSelectedCourse);
      const response = await axios.post(
        `${BACKEND_URL}/staff/getAttendanceHistory`,
        { currentSelectedCourse },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.filteredData);
      setAttendanceList(response.data.filteredData);
    } catch (error) {}
  });

  React.useEffect(() => {
    // if (currentSelectedCourse && currentSelectedCourse.length > 0)
    fecthAttendanceList();
  }, [currentSelectedCourse, isUpdateOrEditAttendanceState]);

  return (
    <>
      {!isUpdateOrEditAttendanceState ? (
        attendanceList?.length > 0 ? (
          <>
            <Sheet
              variant="outlined"
              sx={{
                width: "100%",
                borderRadius: "sm",
                flexShrink: 1,
              }}
            >
              <Table
                aria-labelledby="Attedance"
                stickyHeader
                hoverRow
                sx={{
                  "--TableCell-headBackground":
                    "var(--joy-palette-background-level1)",
                  "--Table-headerUnderlineThickness": "1px",
                  "--TableRow-hoverBackground":
                    "var(--joy-palette-background-level1)",
                  "--TableCell-paddingY": "4px",
                  "--TableCell-paddingX": "8px",
                  cursor: "pointer",
                }}
              >
                <thead>
                  <tr style={{ fontSize: "1.4em" }}>
                    <th
                      style={{
                        width: 30,
                        textAlign: "center",
                        padding: "12px 6px",
                      }}
                    ></th>
                    <th style={{ width: 180, padding: "15px 6px" }}>
                      <Groups2Icon
                        sx={{
                          fontSize: "1.8rem",
                          paddingBottom: "1.5px",
                          paddingRight: "7px",
                        }}
                      />
                      Class
                    </th>
                    <th style={{ width: 200, padding: "15px 6px" }}>
                      <SubjectIcon
                        sx={{
                          fontSize: "1.5rem",
                          paddingBottom: "1.5px",
                          paddingRight: "5px",
                        }}
                      />
                      Subject
                    </th>
                    <th style={{ width: 170, padding: "15px 6px" }}>
                      <AccessTimeFilledOutlinedIcon
                        sx={{
                          fontSize: "1.5rem",
                          paddingBottom: "1.5px",
                          paddingRight: "5px",
                        }}
                      />
                      Time
                    </th>
                    <th style={{ width: 170, padding: "15px 6px" }}>
                      <RuleIcon
                        sx={{
                          fontSize: "1.4rem",
                          paddingBottom: "1.5px",
                          paddingRight: "5px",
                          columnSpan: 2,
                        }}
                      />
                      Attendance
                    </th>
                    <th style={{ width: 100, padding: "15px 6px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceList.map((row, index) => {
                    const percentage = (
                      (row.attendance.attended / row.attendance.total) *
                      100
                    ).toFixed(2);
                    const attendenaceTheme =
                      percentage > 80 ? "A" : percentage > 70 ? "B" : "C";
                    const classYear = Math.ceil(parseInt(row.className[0]) / 2);
                    return (
                      <tr key={row._id}>
                        <td style={{ textAlign: "center", width: 100 }}></td>
                        <td>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                              padding: 2,
                              paddingLeft: 0,
                            }}
                          >
                            <Avatar size="sm" sx={{ fontSize: "0.7rem" }}>
                              {classYear}
                              <sup>
                                {classYear == 1
                                  ? "st"
                                  : classYear == 2
                                    ? "nd"
                                    : classYear == 3
                                      ? "rd"
                                      : "th"}
                              </sup>
                            </Avatar>
                            <Typography
                              level="body-xs"
                              // sx={{ fontWeight: 600, fontSize: "0.9rem" }}
                            >
                              {row.className}
                            </Typography>
                          </Box>
                        </td>
                        <td>
                          <Typography level="body-xs">{row.subject}</Typography>
                        </td>
                        <td>
                          <Typography level="body-xs">{row.time}</Typography>
                        </td>

                        {/* Attendance with Percentage in one <td> */}
                        <td>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                              justifyContent: "space-evenly",
                              paddingRight: "20px",
                            }}
                          >
                            <Chip
                              variant="soft"
                              // size="sm"
                              sx={{
                                padding: "5px 8px",
                                fontSize: "0.8rem",
                              }}
                              startDecorator={
                                {
                                  A: (
                                    <ThumbUpAltRoundedIcon
                                      sx={{ opacity: 0.5, paddingX: "2px" }}
                                    />
                                  ),
                                  B: (
                                    <WarningAmberRoundedIcon
                                      sx={{ opacity: 0.5, paddingX: "1px" }}
                                    />
                                  ),
                                  C: (
                                    <DangerousRoundedIcon
                                      sx={{ opacity: 0.5, paddingX: "1px" }}
                                    />
                                  ),
                                }[attendenaceTheme]
                              }
                              color={
                                {
                                  A: "success",
                                  B: "warning",
                                  C: "danger",
                                }[attendenaceTheme]
                              }
                            >
                              {row.attendance.attended}/{row.attendance.total}
                              &nbsp;&nbsp;
                              <span className=" font-thin text-opacity-20 text-xs">
                                |
                              </span>
                              &nbsp;&nbsp;
                              {percentage}%
                            </Chip>
                            {/* <Chip
                        variant="soft"
                        size="sm"
                        startDecorator={
                          {
                            A: <CheckRoundedIcon />,
                            B: <AutorenewRoundedIcon />,
                            C: <BlockIcon />,
                          }[attendenaceTheme]
                        }
                        color={
                          {
                            A: "success",
                            B: "warning",
                            C: "danger",
                          }[attendenaceTheme]
                        }
                      >
                        {percentage}% 
                      </Chip> */}
                          </Box>
                        </td>
                        <td className="text-xl">
                          <EditOutlinedIcon
                            sx={{ color: "#9CCAE9" }}
                            className="hover:text-blue-800"
                            onClick={() => {
                              handleEditOption(row._id);
                            }}
                          />
                          &nbsp;&nbsp;
                          <DeleteOutlineOutlinedIcon
                            sx={{ color: "#E78081" }}
                            className="hover:text-red-800 "
                            onClick={() => {
                              handleDeleteAttendance(row._id);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Sheet>
            <Box
              className="Pagination-laptopUp"
              sx={{
                pt: 2,
                gap: 1,
                borderRadius: "50%",
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                startDecorator={<KeyboardArrowLeftIcon />}
              >
                Previous
              </Button>

              <Box sx={{ flex: 1 }} />
              {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
                <IconButton
                  key={page}
                  size="sm"
                  variant={Number(page) ? "outlined" : "plain"}
                  color="neutral"
                >
                  {page}
                </IconButton>
              ))}
              <Box sx={{ flex: 1 }} />
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                endDecorator={<KeyboardArrowRightIcon />}
              >
                Next
              </Button>
            </Box>

            {/* <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to delete this attendance record?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog> */}
          </>
        ) : (
          <p className="text-center mt-10 text-xl">
            No Attendance Record Found!
          </p>
        )
      ) : (
        <StudentListForAttendance />
      )}
    </>
  );
}
