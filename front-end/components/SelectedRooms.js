import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Popup from "./Popup";
import { SRLWrapper } from "simple-react-lightbox";
import EditRoomForm from "./EditRoomForm";
import DeleteRoom from "./DeleteRoom";

const SelectedRooms = ({ selectionModel, rows }) => {
  const selected =
    rows && rows.filter((row) => selectionModel.includes(row.id));
  const [openPopup, setOpenPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [select, setSelect] = useState({});

  console.log(selected, rows);

  const selectedName = `Room ${select.roomNumber}`;
  const selectedCategory = select.category;

  return (
    <div>
      {Object.keys(selected).map((row) => (
        <Box
          key={row}
          sx={{
            border: 1,
            borderColor: "primary.main",
            borderRadius: 1,
            marginBottom: 1,
            padding: 1,
            display: "flex",
          }}
        >
          <Typography sx={{ flexGrow: 1 }}>
            {selected[row].roomNumber}
          </Typography>
          <Button
            disableElevation
            variant="contained"
            sx={{ marginRight: 1 }}
            onClick={() => {
              setOpenPopup(true);
              setSelect(selected[row]);
            }}
          >
            View
          </Button>
          <Button
            variant="contained"
            sx={{ marginRight: 1 }}
            disableElevation
            onClick={() => {
              setOpenEditPopup(true);
              setSelect(selected[row]);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            disableElevation
            onClick={() => {
              setOpenDeletePopup(true);
              setSelect(selected[row]);
            }}
          >
            Delete
          </Button>
        </Box>
      ))}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={selectedName}
        draggable
        fullScreen={true}
      >
        <Box flex justifyContent="space-around" alignItems="space-around">
          <Typography variant="h5" style={{ fontWeight: "bold" }} mt={3}>
            Room Number:{" "}
            <span style={{ fontWeight: "normal" }}>{select.roomNumber}</span>
          </Typography>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Category Name:{" "}
            <span style={{ fontWeight: "normal" }}>
              {selectedCategory && selectedCategory.name}
            </span>
          </Typography>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Max Number of People:{" "}
            <span style={{ fontWeight: "normal" }}>
              {selectedCategory && selectedCategory.maxPeople}
            </span>
          </Typography>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Price Per Hour:{" "}
            <span style={{ fontWeight: "normal" }}>
              {selectedCategory && selectedCategory.price_per_hour} TK/-
            </span>
          </Typography>
        </Box>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", marginBottom: 20 }}
        >
          Images for {selectedCategory && selectedCategory.name}
        </Typography>
        <SRLWrapper>
          <div
            style={{
              position: "relative",
              width: 1000,
              height: 200,
              display: "grid",
              gridTemplateColumns: "repeat(3, 200px)",
              gap: 30,
            }}
          >
            {selectedCategory &&
              selectedCategory.images &&
              selectedCategory.images.map((img) => {
                return (
                  <div
                    key={img}
                    style={{
                      border: "5px solid #808080",
                      width: 200,
                      height: 200,
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
                  </div>
                );
              })}
          </div>
        </SRLWrapper>
      </Popup>

      {/* EditPopup  */}

      <Popup
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
        title={`Edit ${"selectedName"}`}
        draggable
        fullScreen={true}
      >
        <EditRoomForm
          editableRow={select}
          setOpenEditPopup={setOpenEditPopup}
        />
      </Popup>

      {/* DeletePopup */}
      <Popup
        openPopup={openDeletePopup}
        setOpenPopup={setOpenDeletePopup}
        title={`Delete ${"selectedName"}`}
        draggable
      >
        <DeleteRoom
          deletableRow={select}
          setOpenDeletePopup={setOpenDeletePopup}
        />
      </Popup>
    </div>
  );
};

export default SelectedRooms;
