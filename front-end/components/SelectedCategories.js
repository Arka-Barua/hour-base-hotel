import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Popup from "./Popup";
import { SRLWrapper } from "simple-react-lightbox";
import EditCategoryForm from "./EditCategoryForm";

const SelectedCategories = ({ selectionModel, rows }) => {
  const selected = rows.filter((row) => selectionModel.includes(row.id));
  const [openPopup, setOpenPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [select, setSelect] = useState("");

  const selectedName = `${select.name}`;

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
          <Typography sx={{ flexGrow: 1 }}>{selected[row].name}</Typography>
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
            disableElevation
            onClick={() => {
              setOpenEditPopup(true);
              setSelect(selected[row]);
            }}
          >
            Edit
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
        {select && console.log(select)}
        <Box flex justifyContent="space-around" alignItems="space-around">
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Name: <span style={{ fontWeight: "normal" }}>{select.name}</span>
          </Typography>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Max Number of People:{" "}
            <span style={{ fontWeight: "normal" }}>{select.maxPeople}</span>
          </Typography>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Price Per Hour:{" "}
            <span style={{ fontWeight: "normal" }}>
              {select.price_per_hour} TK/-
            </span>
          </Typography>
        </Box>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", marginBottom: 20 }}
        >
          Images for {select.name}
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
            {select.images &&
              select.images.map((img) => {
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
        title={selectedName}
        draggable
        fullScreen={true}
      >
        <EditCategoryForm
          editableRow={select}
          setOpenEditPopup={setOpenEditPopup}
        />
      </Popup>
    </div>
  );
};

export default SelectedCategories;
