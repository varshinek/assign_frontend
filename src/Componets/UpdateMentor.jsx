import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function UpdateMentor() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [assignedStudents, setAssignedStudents] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [assignedStudentsName,setAssignedStudentsName] = useState([]);

  const getMentorData = async (_id) => {
    try {
      const { data } = await axios.get(
        `https://assign-mentor-backend-pws4.onrender.com/mentor/show/${_id}`
      );
      setAssignedStudents([...data.MentorData.assignedStudentsID]);
      setMentorName(data.MentorData.mentorName[0]);
      setAssignedStudentsName(data.MentorData.assignedStudentsName);
    } catch (err) {
      setError("Error whilde getting mentor details", err);
    }
  };

  const getStudentsData = async () => {
    try {
      const { data } = await axios.get(
        `https://assign-mentor-backend-pws4.onrender.com/student/show`
      );
      setStudents(data.allstudents);
    } catch (err) {
      setError("Error whilde getting student details", err);
    }
  };

  const showvalue = async (_id) => {
    if (!mentorName && assignedStudents.length == 0) {
      alert("Need to fill atleast Mentor Name to update");
    } else if (assignedStudents.length == 0) {
      try {
        await axios.put(
          `https://assign-mentor-backend-pws4.onrender.com/mentor/update/${_id}`,
          { mentorName }
        );
        navigate("/Mentorslist");
      } catch (err) {
        alert(
          `Warning message : ${err.response.data.message}. Updated mentor Name only`
        );
      }
    } else {
      try {
        await axios.put(
          `https://assign-mentor-backend-pws4.onrender.com/mentor/update/${_id}`,
          { mentorName, assignedStudents }
        );
        navigate("/Mentorslist");
      } catch (err) {
        alert(`Warning message : ${err.response.data.message}.`);
      }
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAssignedStudents(typeof value === "string" ? value.split(",") : value);
  };

  const para_style = {
    textAlign: "center",
    paddingBottom: "10px",
  };

  useEffect(() => {
    getMentorData(_id);
    getStudentsData();
  }, []);

  if (students.length == 0 || !mentorName)
    return (
      <div style={para_style}>
        Loading Students Assign Page for Selected Mentor
      </div>
    );

  if (error)
    return (
      <>
        <Button
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
        <div style={{ marginTop: "10px" }}>{error}</div>
      </>
    );

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <div className="AccordionDiv">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="content"
            id="header"
          >
            {mentorName} Mentor Data.
          </AccordionSummary>
          <AccordionDetails>
            <ol>
              <li><b>Current Students </b> : {assignedStudentsName.length == 0 ? `-` : assignedStudentsName.join(', ')}</li>
            </ol>
          </AccordionDetails>
        </Accordion>
      </div>
      <div>
      <p style={para_style}>
        Update Mentor / Assign Students to Mentor - {mentorName}.
      </p>
      <Box
        component="form"
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          alignTtems: "center",
        }}
        noValidate
      >
        <TextField
          id="StudentName"
          label="Student Name"
          value={mentorName}
          variant="outlined"
          required
          onChange={(e) => setMentorName(e.target.value)}
        />

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="Assign_Students">Assign Students</InputLabel>
          <Select
            labelId="Assign_Students"
            id="Assign_Students"
            multiple
            value={assignedStudents}
            onChange={handleChange}
            input={<OutlinedInput label="Assign Students" />}
          >
            {students.map((ele) => (
              <MenuItem key={ele._id} value={ele._id}>
                {ele.studentName[0]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          color="warning"
          variant="contained"
          onClick={() => showvalue(_id)}
        >
          Update
        </Button>
      </Box>
      </div>
    </>
  );
}

export default UpdateMentor;
