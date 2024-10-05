import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Home() {
  return (
    <>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="section"
          sx={{ p: 2, border: "1px dashed grey", fontWeight: "600" }}
        >
          Mentor and Student Assigning with Database <br></br>
          <mark>
            Note : Response from render.com is much slower when we do first API
            call
          </mark>
        </Box>
      </div>
      <div>
        <Box component="section" sx={{ p: 2, fontWeight: "500" }}>
          <h2>Task Description :</h2>
          <div>
            <ol>
              <li>Write API to create Mentor</li>
              <li>Write API to create Student</li>
              <li>
                Write API to Assign a student to Mentor
                <ul>
                  <li>Select one mentor and Add multiple Student</li>
                  <li>
                    A student who has a mentor should not be shown in List
                  </li>
                </ul>
              </li>
              <li>
                Write API to Assign or Change Mentor for particular Student
                <ul>
                  <li>Select One Student and Assign one Mentor</li>
                </ul>
              </li>
              <li>Write API to show all students for a particular mentor</li>
              <li>
                Write an API to show the previously assigned mentor for a
                particular student.
              </li>
            </ol>
          </div>
        </Box>
      </div>
      <div>
        <Box component="section" sx={{ p: 2, fontWeight: "500" }}>
          <h2>How To Use</h2>
          <div>
            <ol>
              <li>Add Student / Mentors</li>
              <li>Students with no current Mentors will shown in table</li>
              <li>
                By clicking the Assign Mnetor button we can able to assign
                mentor for that particular student
              </li>
              <li>
                By clicking the Assign students button for particular mentor we
                can able to assign multiple students
              </li>
              <li>
                In Student list page we can able to see all student data in a
                table / we can change or assign new mentor <br></br>to the
                students by clicking assign mentor button for the particular
                student
              </li>
              <li>
                In Mentor list page we can able to all mentors details in a
                table / we can edit or assign more students to the particular
                mentor
              </li>
              <li>
                While uldating particular student we can able to update there
                names along with current mentor
              </li>
              <li>
                while updating particular mentor detail we can able to update
                there names along with assigned students
              </li>
            </ol>
          </div>
        </Box>
      </div>
      <div>
        <Box component="section" sx={{ p: 2, fontWeight: "500" }}>
          <h2>API EndPoints Details</h2>
          <div>
            <ol>
              <li>
                GET METNOD :
                <ul>
                  <li>
                    FOR STUDENTS DATA :
                    <ul>
                      <li>
                        <mark>student/show</mark> --{">"} To get all students
                        data. It will show total student count and studentName
                        and there currentMentorName and previous mentorNames in
                        array.
                      </li>
                      <li>
                        <mark>student/show/:studentID</mark> --{">"} To get
                        specific student data. It shows the studentName and
                        there currentMentorName and previousMentorsName in
                        array.
                      </li>
                    </ul>
                  </li>
                  <li>
                    FOR MENTORS DATA :
                    <ul>
                      <li>
                        <mark>mentor/show</mark> --{">"} To get all mentors
                        data. It will show the total mentors count and
                        mentorName and there assignedStudentsName in array.
                      </li>
                      <li>
                        <mark>mentor/show/:mentorID</mark> --{">"} To get the
                        specific mentor data. It shows the mentorName and there
                        assignedStudentsName in array.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                POST METHOD :
                <ul>
                  <li>
                    FOR STUDENT DATA :
                    <ul>
                      <li>
                        <mark>student/add</mark> --{">"} To add initial student
                        data. It requires only studentName to create.
                        REQUIREMENTS (studentName should be unique).
                      </li>
                    </ul>
                  </li>
                  <li>
                    FOR MENTOR DATA :
                    <ul>
                      <li>
                        <mark>mentor/add</mark> --{">"} To add initial mentor
                        data. It requires only mentorName to create.
                        REQUIREMENTS (mentorName should be unique).
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                PUT METHOD / UPDATE :
                <ul>
                  <li>
                    FOR STUDENT DATA :
                    <ul>
                      <li>
                        <mark>student/update/:studentID</mark> --{">"} To assign
                        currentMentor to the newly created student data / update
                        the currentMentor of specific student data and the
                        currentMentor name will be pushed into the
                        previousMentors Array if only when the currentMentor is
                        not already in the array. REQUIREMENTS
                        ("studentName":"", "currentMentor" : "mentorID")
                      </li>
                    </ul>
                  </li>
                  <li>
                    FOR MENTOR DATA :
                    <ul>
                      <li>
                        <mark>mentor/update/:mentorID</mark> --{">"} To assign
                        multiple students for the specific mentor. REQUIREMENTS
                        ("mentorName":"", "assignedStudents": ["studentID_1", "studentID_2"])
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </Box>
      </div>
    </>
  );
}

export default Home;
