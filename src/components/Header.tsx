import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const appBar = {
  bgcolor: "#f1f2f7",
  boxShadow: "none",
  color: "#282828",
};

const toolbar = { padding: "0px" };

const Header = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static" sx={appBar}>
        <Toolbar style={toolbar}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Redux Toolkit Todo
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
