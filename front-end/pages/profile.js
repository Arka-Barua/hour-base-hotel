import { Container, Typography, Box } from "@mui/material";
import UserLayout from "../components/UserLayout";
import { useAuthContext } from "../context/AuthContext";
import withAuth from "../HOC/withAuth";

const Profile = () => {
  const {
    user: { firstname, lastname, mobile, email },
  } = useAuthContext();
  return (
    <UserLayout>
      <Container>
        <Box mt={5}>
          <Typography variant="h4" mb={5} fontWeight={"bold"}>
            Welcome, {firstname} {lastname}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>First Name:</span> {firstname}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Last Name:</span> {lastname}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Email:</span> {email}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Phone:</span> {mobile}
          </Typography>
        </Box>
      </Container>
    </UserLayout>
  );
};

export default withAuth(Profile);
