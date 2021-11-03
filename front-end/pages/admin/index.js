import AdminLayout from "../../components/AdminLayout";
import withAuth from "../../HOC/withAuth";
import withAdmin from "../../HOC/withAdmin";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Dashboard = () => {
  return (
    <AdminLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          height: "calc(100vh - 120px)",
        }}
      >
        <Typography variant="h4" mt={2} fontWeight="bold">
          Welcome to Admin Dashboard
        </Typography>
        <p>Follow the sidebar to navigate through pages.</p>
      </Box>
    </AdminLayout>
  );
};

export default withAdmin(withAuth(Dashboard));
