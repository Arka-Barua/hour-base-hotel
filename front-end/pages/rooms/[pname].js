import { Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { SRLWrapper } from "simple-react-lightbox";
import useSWR from "swr";
import api from "../../axios";
import Link from "next/link";
import Image from "next/image";
import UserLayout from "../../components/UserLayout";
import { Box } from "@mui/system";

const fetcher = (url) => api.get(url).then((res) => res.data);

const SingleRooms = () => {
  const router = useRouter();
  const { pname } = router.query;
  const { data: rooms } = useSWR(`/category/single/${pname}`, fetcher);

  return (
    <Box>
      <UserLayout>
        <Toolbar />
        <Container>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ marginBottom: 4, marginLeft: 1, flexGrow: 1 }}
            >
              {rooms && rooms.name}room
            </Typography>
            <Button variant="contained" sx={{ height: "2.5rem" }}>
              Book Now
            </Button>
          </Box>
        </Container>
        <SRLWrapper>
          <Grid
            container
            gap={8}
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              height: 200,
              maxWidth: "inherit",
            }}
          >
            {rooms &&
              rooms.images.map((img) => {
                return (
                  <Grid
                    item
                    key={img}
                    md={3}
                    xs={12}
                    sx={{
                      border: "5px solid #808080",
                      borderRadius: 1,
                    }}
                  >
                    <Link href={`${process.env.API_URL}/category/${img}`}>
                      <a>
                        <Image
                          width={200}
                          height={200}
                          src={`${process.env.API_URL}/category/${img}`}
                          objectFit="cover"
                          layout="responsive"
                        />
                      </a>
                    </Link>
                  </Grid>
                );
              })}
          </Grid>
        </SRLWrapper>
        <Container>
          <Grid container mt={25} mb={5}>
            <Grid item md={6}>
              <Typography maxWidth={450}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
                est mollitia, dolores cum natus libero deserunt aliquam, rerum
                accusamus autem voluptas velit iusto nostrum ut expedita, quam
                veniam aspernatur tenetur.
              </Typography>
            </Grid>
            <Grid item md={6} textAlign="end">
              <Box>
                <Typography>
                  <span style={{ fontWeight: "bold" }}>Name: </span>
                  {rooms && rooms.name}
                </Typography>
                <Typography>
                  <span style={{ fontWeight: "bold" }}>Max People: </span>
                  {rooms && rooms.maxPeople}
                </Typography>
                <Typography>
                  <span style={{ fontWeight: "bold" }}>Price per hour: </span>
                  {rooms && rooms.price_per_hour}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </UserLayout>
    </Box>
  );
};

export default SingleRooms;
