import React from "react";
import { Outlet, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddIcon from "@mui/icons-material/Add";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";

function Home() {
  return (
    <>
      <Box
      position={"fixed"}
        sx={{
          width: "250px",
          margin: 0,
          padding: 0,
          bgcolor: "background.paper",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <Link to="/feed" style={{ textDecoration: "none", color: "black" }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
            </Link>
            {/* <Link
              to="/authers"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FormatQuoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Authers" />
                </ListItemButton>
              </ListItem>
            </Link> */}
            <Link
              to="/create"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Authers" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to="/books"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AutoStoriesIcon />
                  </ListItemIcon>
                  <ListItemText primary="Books" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to="/create-book"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <NoteAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Book" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </nav>
        <Divider />
      </Box>
      <Outlet />
    </>
  );
}

export default Home;
// windows + . => emoji
