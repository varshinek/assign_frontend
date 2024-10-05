import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Route, Routes, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CloseIcon from "@mui/icons-material/Close";
import Dashboard from "./Dashboard";
import Home from "./Home";
import StudentList from "./StudentList";
import MentorList from "./MentorList";
import UpdateStudent from "./UpdateStudent";
import UpdateMentor from "./UpdateMentor";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  const tool_bar = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  };

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Add Student / Mentor",
      path: "/Dashboard",
      icon: <PersonAddAltIcon />,
    },
    {
      name: "Student List",
      path: "/Studentslist",
      icon: <GroupsIcon />,
    },
    {
      name: "Mentors List",
      path: "/Mentorslist",
      icon: <BookmarkAddIcon />,
    },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <ListItemButton onClick={toggleDrawer(false)}>
        <ListItemIcon>
          <CloseIcon />
        </ListItemIcon>
        <ListItemText primary="Close Menu" />
      </ListItemButton>
      <Divider />
      <List>
        {menuItems.map((text) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton onClick={() => navigate(`${text.path}`)}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <ListItemButton onClick={()=>{toggleDrawer(false); setUserName(""); navigate("/")}}>
        <ListItemIcon>
          <LogoutIcon/>
        </ListItemIcon>
        <ListItemText primary="LogOut" />
      </ListItemButton> */}
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        style={{ marginBottom: "20px" }}
        sx={{ backgroundColor: "#f1fff" }}
      >
        <Toolbar style={tool_bar}>
          <div style={{ alignItems: "center", display: "flex" }}>
            <Button
              color="inherit"
              aria-label="OpenMenu"
              onClick={toggleDrawer(true)}
              startIcon={<MenuIcon />}
            >
              Open Menu
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ paddingRight: "10px" }}>
              Student-Mentor Assigning WebApplication
            </div>
            {/* <Avatar sx={{ bgcolor: deepPurple[500] }}/> */}
          </div>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Studentslist" element={<StudentList />} />
        <Route path="/Mentorslist" element={<MentorList />} />
        <Route path="/Student/:_id" element={<UpdateStudent/>}/>
        <Route path="/Mentor/:_id" element={<UpdateMentor/>}/>
      </Routes>
    </>
  );
}

export default Navbar;
