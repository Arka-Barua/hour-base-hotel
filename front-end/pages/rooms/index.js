import {
  Toolbar,
  Container,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import UserLayout from "../../components/UserLayout";
import useSWR from "swr";
import api from "../../axios";
import router from "next/router";

const fetcher = (url) => api.get(url).then((res) => res.data);

const Rooms = () => {
  const { data: category } = useSWR("/category", fetcher);

  return (
    <UserLayout>
      <main style={{ background: "#F4F4F4" }}>
        <Toolbar />
        <Container>
          <Grid container spacing={2}>
            {category?.map((item) => (
              <Grid item md={4} xs={12} key={item.id}>
                <Card sx={{ maxWidth: 345, marginBottom: 3 }}>
                  <CardHeader
                    title={item.name}
                    subheader={`${item.price_per_hour}/hr`}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={`${process.env.API_URL}/category/${item.images[0]}`}
                    alt="Paella dish"
                  />
                  <CardActions sx={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      disableElevation
                      variant="contained"
                      onClick={() => {
                        router.push(`/rooms/${item.name}`);
                      }}
                    >
                      View
                    </Button>
                    <Button disableElevation variant="contained">
                      Book
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
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
