import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  CssBaseline,
  IconButton,
} from "@mui/material";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";
import MenuIcon from "@mui/icons-material/Menu";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      {/* Header Navigation */}
      <AppBar position="static" sx={{ backgroundColor: "#1976D2" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: "0.05em",
              cursor: "pointer",
              textDecoration: "none",
            }}
            component={Link}
            to="/"
            color="inherit"
          >
            Admin Panel
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ fontWeight: "500" }}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/users"
              sx={{ fontWeight: "500" }}
            >
              Users
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/roles"
              sx={{ fontWeight: "500" }}
            >
              Roles
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          py: 4,
          px: 3,
          borderRadius: "12px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
