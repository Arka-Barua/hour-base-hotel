import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import router from "next/router";
import UserLayout from "../../components/UserLayout";
import api from "../../axios";
import useSWR from "swr";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

const fetcher = (url) => api.get(url).then((res) => res.data);

const columns = [
  { field: "checkIn", headerName: "Check In", width: 190 },
  { field: "checkOut", headerName: "Check Out", width: 190 },
  { field: "totalPrice", headerName: "Total Price(TK)", width: 130 },
  { field: "stayDuration", headerName: "Stay Duration(hr)", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 90,
  },
];

const Booking = () => {
  const { data } = useSWR("/booking/getbookings/user", fetcher, {
    refreshInterval: 120000,
  });

  if (data) {
    data.map((item) => {
      item.checkIn = format(new Date(item.checkIn), "PPpp");
      item.checkOut = format(new Date(item.checkOut), "PPpp");
    });
  }

  console.log(data);
  return (
    <UserLayout>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <Typography
            mt={8}
            variant="h6"
            fontWeight="bold"
            sx={{ flexGrow: 1 }}
          >
            Bookings
          </Typography>
          <Button
            variant="contained"
            disableElevation
            disableRipple
            sx={{ height: "2.5rem" }}
            onClick={() => {
              router.push("/bookings/create");
            }}
          >
            Create Booking
          </Button>
        </Box>
        <div style={{ width: "100%", height: 400, marginTop: 30 }}>
          {data && (
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              // rowsPerPageOptions={[5]}
            />
          )}
        </div>
      </Container>
    </UserLayout>
  );
};

export default Booking;
