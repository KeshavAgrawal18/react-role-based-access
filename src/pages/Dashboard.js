import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Paper,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UserTable from "../components/UserManagement/UserTable";

const Dashboard = () => {
  const handleAction = (action) => {
    console.log(`Perform Dashboard Action: ${action}`);
  };

  return (
    <Container>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage users, view analytics, and monitor key metrics efficiently.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {/* Total Users Card */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ borderRadius: "12px" }}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  p: 2,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 64,
                  height: 64,
                }}
              >
                <PeopleIcon fontSize="large" />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  Total Users
                </Typography>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  5
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleAction("View Users")}
                >
                  View Users
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
        {/* Pending Requests Card */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ borderRadius: "12px" }}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Box
                sx={{
                  backgroundColor: "secondary.main",
                  color: "white",
                  p: 2,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 64,
                  height: 64,
                }}
              >
                <AssignmentIcon fontSize="large" />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  Pending Requests
                </Typography>
                <Typography variant="h4" color="secondary" fontWeight="bold">
                  8
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleAction("Review Requests")}
                >
                  Review Requests
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
        {/* User Table */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{ borderRadius: "12px", overflow: "hidden" }}
          >
            <UserTable showActions={false} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
