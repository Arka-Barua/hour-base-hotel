import api from "../../axios";
import useSWR from "swr";
import AdminLayout from "../../components/AdminLayout";
import withAuth from "../../HOC/withAuth";
import withAdmin from "../../HOC/withAdmin";
import { Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" mt={2} fontWeight="bold">
          Welcome to Admin Dashboard
        </Typography>
        <p>Follow the sidebar to navigate through pages.</p>
      </div>
    </AdminLayout>
  );
};

export default withAdmin(withAuth(Dashboard));
