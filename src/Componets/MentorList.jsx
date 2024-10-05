import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function MentorList() {

  const navigate = useNavigate();

  const [mentorsData, setMentorsData] = useState("");
  const [error, setError] = useState("");
  const [totalMentors, setTotalMentors] = useState("");
  const [mentorLoading,setMentorLoading] = useState(true)

  const getMentorDetails = async () => {
    try {
      const { data } = await axios.get(
        "https://assign-mentor-backend-pws4.onrender.com/mentor/show"
      );
      data.allmentors.sort((a,b)=> a._id.localeCompare(b._id))
      setMentorsData(data.allmentors);
      setTotalMentors(data.Total_Mentors);
      setMentorLoading(false)
    } catch (err) {
      setMentorLoading(false)
      setError(err.message);
    }
  };

  useEffect(() => {
    getMentorDetails();
  }, []);

  if (mentorLoading) return (
    <div className="LoadingMain">
        <div className="LoadingText">Loading Mentors list please wait...</div>
        <div className="LoadingGIF">
          <CircularProgress color="secondary" />
        </div>
      </div>
  );

  if (error) return <div>Error while getting Mentor Data - {error}</div>;

  return (
    <div>
      Total Mnetors - {totalMentors}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mentor Name</TableCell>
              <TableCell align="center">Assigned Students</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentorsData.map((ele) => (
              <TableRow key={ele._id}>
                <TableCell component="th" scope="row">
                  {ele.mentorName[0]}
                </TableCell>
                {ele.assignedStudentsName.length == 0 ? (
                  <TableCell align="center"> - </TableCell>
                ) : (
                  <TableCell align="center">
                    {ele.assignedStudentsName.join(", ")}
                  </TableCell>
                )}
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => navigate(`/Mentor/${ele._id}`)} startIcon={<GroupAddIcon />}>
                    Assign Students
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

export default MentorList;
