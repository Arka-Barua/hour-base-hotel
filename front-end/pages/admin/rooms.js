import { forwardRef, useEffect, useState } from "react";
import api from "../../axios";
import AdminLayout from "../../components/AdminLayout";
import withAdmin from "../../HOC/withAdmin";
import withAuth from "../../HOC/withAuth";
import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "../../components/CustomToolbar";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";
import { Button, Slide, Typography } from "@mui/material";
import Popup from "../../components/Popup";
import { Box } from "@mui/system";
import useSWR from "swr";
import SelectedRooms from "../../components/SelectedRooms";
import AddRoomForm from "../../components/AddRoomForm";

const fetcher = (url) => api.get(url).then((res) => res.data);

const columns = [
  { field: "roomNumber", headerName: "Room Number", width: 200 },
  {
    field: "name",
    headerName: "Category",
    width: 130,
  },
];

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Rooms = () => {
  const { data } = useSWR("/room", fetcher, {
    revalidateOnFocus: false,
  });
  const [searchText, setSearchText] = useState("");
  const [rooms, setRooms] = useState([]);
  const [rows, setRows] = useState(rooms);
  const [selectionModel, setSelectionModel] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = rooms.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  useEffect(async () => {
    const getRooms =
      data &&
      data.map((room) => {
        let roomArray = Object.entries(room).filter(
          ([key]) => key === "roomNumber" || key === "id"
        );
        const category = Object.entries(room.category);
        const categoryName = category.filter(([key]) => key === "name");
        roomArray.push(categoryName[0]);
        return Object.fromEntries(roomArray);
      });
    console.log(getRooms);
    data && getRooms && setRooms(getRooms);
  }, [data]);

  useEffect(() => {
    setRows(rooms);
  }, [rooms]);

  return (
    <AdminLayout>
      <main
        style={{ marginBottom: "4rem", display: "flex", marginTop: "2rem" }}
      >
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Rooms
        </Typography>
        <Button
          variant="contained"
          disableElevation
          disableRipple
          onClick={() => {
            setOpenPopup(true);
          }}
        >
          Add New Room
        </Button>
      </main>
      {data && <SelectedRooms selectionModel={selectionModel} rows={data} />}

      <div style={{ height: 400, width: "100%" }}>
        {rooms && (
          <DataGrid
            {...data}
            components={{
              Toolbar: CustomToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(""),
              },
            }}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
          />
        )}
      </div>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add New Room"
        draggable
        // TransitionComponent={Transition}
        fullScreen
      >
        <Box>
          <AddRoomForm setOpenPopup={setOpenPopup} />
        </Box>
      </Popup>
    </AdminLayout>
  );
};

export default withAdmin(withAuth(Rooms));
