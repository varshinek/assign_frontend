import React, { useState, useEffect } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function StudentList() {
  const navigate = useNavigate();

  const [studentsData, setStudentsData] = useState("");
  const [totalStudents, setTotalStudents] = useState("");
  const [error, setError] = useState("");
  const [studentLoading,setStudentLoading] = useState(true)

  const getStudentsDetail = async () => {
    try {
      const { data } = await axios.get(
        "https://assign-mentor-backend-pws4.onrender.com/student/show"
      );
      data.allstudents.sort((a,b)=> a._id.localeCompare(b._id))
      setStudentsData(data.allstudents);
      setTotalStudents(data.Total_Students);
      setStudentLoading(false)
    } catch (err) {
      setStudentLoading(false)
      setError(err.message);
    }
  };

  useEffect(() => {
    getStudentsDetail();
  }, []);

  if (studentLoading) return (
    <div className="LoadingMain">
        <div className="LoadingText">Loading Students list please wait...</div>
        <div className="LoadingGIF">
          <CircularProgress color="secondary" />
        </div>
      </div>
  );

  if (error) return <div>Error while getting Student Data - {error}</div>;

  return (
    <div>
      Total Students - {totalStudents}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell align="center">Current Mentor</TableCell>
              <TableCell align="center">Previous Mentors</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsData.map((ele) => (
              <TableRow key={ele._id}>
                <TableCell component="th" scope="row">
                  {ele.studentName[0]}
                </TableCell>
                {ele.currentMentorName.length == 0 ? (
                  <TableCell align="center"> - </TableCell>
                ) : (
                  <TableCell align="center">
                    {ele.currentMentorName[0]}
                  </TableCell>
                )}
                {ele.previousMentorsName.length == 0 ? (
                  <TableCell align="center"> - </TableCell>
                ) : (
                  <TableCell align="center">
                    {ele.previousMentorsName.join(", ")}
                  </TableCell>
                )}
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
  );
}

export default StudentList;
