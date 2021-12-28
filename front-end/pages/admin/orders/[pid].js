import {
  Button,
  Container,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  differenceInHours,
  format,
  formatDuration,
  intervalToDuration,
} from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import api from "../../../axios";

const fetcher = (url) => api.get(url).then((res) => res.data);

const SingleOrder = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { data } = useSWR(`/booking/getSinglebooking/${pid}`, fetcher);
  const { data: rooms } = useSWR(`/booking/roomSearch/${pid}`, fetcher);
  const [submitError, setSubmitError] = useState("");
  if (data) {
    data.map((item) => {
      item.checkIn = format(new Date(item.checkIn), "PPpp");
      item.checkOut = format(new Date(item.checkOut), "PPpp");
    });
  }
  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Selected Order
      </Typography>
      {data && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Check In: </span>
              {data[0].checkIn}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Check Out: </span>
              {data[0].checkOut}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Status: </span>
              {data[0].status}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Stay Duration: </span>
              {data[0].stayDuration}{" "}
              {data[0].stayDuration > 1 ? "hours" : "hour"}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Total Price: </span>
              {data[0].totalPrice} TK
            </Typography>
          </Box>
          <Box mb={8}>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Category Name: </span>
              {data[0].category.name}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Price/hr: </span>
              {data[0].category.price_per_hour}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Customer: </span>
              {data[0].__user__.firstname} {data[0].__user__.lastname}
            </Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>Contact: </span>
              {data[0].__user__.mobile}
            </Typography>
          </Box>
        </Box>
      )}
      {data && data[0].status === "pending" && (
        <Typography variant="contained">Available Rooms</Typography>
      )}
      <List>
        {rooms &&
          data[0].status === "pending" &&
          rooms.map((room) => (
            <ListItem key={room.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                  padding: "0 .5rem",
                  border: "1px solid grey",
                  borderRadius: 5,
                }}
              >
                <h3 style={{ flexGrow: 1 }}>
                  RoomNumber:{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {room.roomNumber}
                  </span>
                </h3>
                <Button
                  variant="contained"
                  sx={{ height: "2.5rem" }}
                  onClick={() => {
                    console.log(pid, room.id);
                    api
                      .post(`/booking/assignRoom`, {
                        id: pid,
                        roomId: room.id,
                      })
                      .then((res) => {
                        if (res.status < 300) {
                          mutate(`/booking/getSinglebooking/${pid}`);
                          mutate("/booking");
                          console.log(res.data);
                        }
                      })
                      .catch((error) => {
                        if (error.response) {
                          console.log(error.response.data);
                          setSubmitError(error.response.data.message);
                        }
                      });
                  }}
                >
                  Assign
                </Button>
              </div>
            </ListItem>
          ))}
      </List>
      {submitError && <strong style={{ color: "red" }}>{submitError}</strong>}
    </Container>
  );
};

export default SingleOrder;
