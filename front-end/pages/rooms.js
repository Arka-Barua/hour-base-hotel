import { Toolbar, Container } from "@mui/material";
import UserLayout from "../components/UserLayout";

const Rooms = () => {
  return (
    <UserLayout>
      <Toolbar />
      <Container>
        <div style={{ marginBottom: 20 }}>Rooms</div>
      </Container>
    </UserLayout>
  );
};

export default Rooms;

// Time Date Experiment

{
  /* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <DateTimePicker
              label="Date&Time picker"
              value={value}
              disablePast={true}
              minutesStep={60}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <input type="submit" value="submit" />
          </form>
        </LocalizationProvider> */
}
