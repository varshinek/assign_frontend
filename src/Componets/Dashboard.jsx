import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from '@mui/material/Divider';

function Dashboard() {
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [error, setError] = useState("");
  const [mentorLoading,setMentorLoading] = useState(true)
  const [studentLoading,setStudentLoading] = useState(true)

  const [studentsData, setStudentsData] = useState("");
  const [mentorsData, setMentorsData] = useState("");

  const getStudentData = async () => {
    try {
      const { data } = await axios.get(
        "https://assign-mentor-backend-pws4.onrender.com/student/show"
      );
      setStudentsData(
        data.allstudents.filter((ele) => ele.currentMentorName.length == 0)
      );
      setStudentLoading(false)
    } catch (err) {
      setStudentLoading(false)
      setError(`Error while getting Students Data`);
    }
  };

  const getMentorData = async () => {
    try {
      const { data } = await axios.get(
        "https://assign-mentor-backend-pws4.onrender.com/mentor/show"
      );
      setMentorsData(data.allmentors);
      setMentorLoading(false)
    } catch (err) {
      setMentorLoading(false)
      setError("Error while getting Mentors Data");
    }
  };

  const AddStudent = async () => {
    if (!studentName) {
      alert("Error Student name is required field");
    } else {
      console.log(studentName);
      try {
        await axios.post(
          "https://assign-mentor-backend-pws4.onrender.com/student/add",
          { studentName }
        );
        setStudentName("");
        getStudentData();
      } catch (err) {
        alert(`${err.response.data.message}. Student Name already Exist`);
      }
    }
  };

  const AddMentor = async () => {
    if (!mentorName) {
      alert("Mentor Name is requied field");
    } else {
      console.log(mentorName);
      try {
        await axios.post(
          "https://assign-mentor-backend-pws4.onrender.com/mentor/add",
          { mentorName }
        );
        setMentorName("");
        getMentorData();
      } catch (err) {
        console.log(err);
        alert(`${err.response.data}. Mentor Name already Exist`);
      }
    }
  };

  useEffect(() => {
    getStudentData();
    getMentorData();
  }, []);

  if (mentorLoading && studentLoading)
    return (
      <div className="LoadingMain">
        <div className="LoadingText">Loading please wait...</div>
        <div className="LoadingGIF">
          <CircularProgress color="secondary" />
        </div>
      </div>
    );

  if (error) return <div>Error - {error}</div>;

  return (
    <>
      <div className="centered">
        <h2>Add Student</h2>
        <Box
          sx={{
            paddingBottom: "10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ marginBottom: "3px" }}
            id="studentName"
            label="Student Name"
            value={studentName}
            variant="outlined"
            onChange={(e) => setStudentName(e.target.value)}
          />
          <Button
            sx={{ marginTop: "3px" }}
            variant="contained"
            onClick={AddStudent}
          >
            Add Student
          </Button>
        </Box>
        <div className="Table">
          {studentsData.length > 0 ? (
            <div>
              <div className="WarningText">
                Students not having current mentors shown in this Table
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 280 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Student Name</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentsData.map((ele) => (
                      <TableRow key={ele._id}>
                        <TableCell align="center" component="th" scope="row">
                          {ele.studentName[0]}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            onClick={() => navigate(`/Student/${ele._id}`)}
                            startIcon={<PersonAddAlt1Icon />}
                          >
                            Assign Mentor
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <div className="WarningText">
              Add more Students in list.
            </div>
          )}
        </div>
      </div>

      <Divider/>

      <div className="centered">
        <h2>Add Mentor</h2>
        <Box
          sx={{
            paddingBottom: "10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ marginBottom: "3px" }}
            id="mentorName"
            label="Mentor Name"
            value={mentorName}
            variant="outlined"
            onChange={(e) => setMentorName(e.target.value)}
          />
          <Button variant="contained" sx={{ marginTop: "3px" }} onClick={AddMentor}>
            Add Mentor
          </Button>
        </Box>
        <div className="Table">
          <div>
            {mentorsData.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 280 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Mentor Name</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mentorsData.map((ele) => (
                      <TableRow key={ele._id}>
                        <TableCell align="center" component="th" scope="row">
                          {ele.mentorName[0]}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            onClick={() => navigate(`/Mentor/${ele._id}`)}
                            startIcon={<GroupAddIcon />}
                          >
                            Assign Students
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              "Add mentor to show table"
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
