import { Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useState } from "react";
import Popup from "./Popup";

const SelectedUsers = ({ selectionModel, rows }) => {
  const selected = rows.filter((row) => selectionModel.includes(row.id));
  const [openPopup, setOpenPopup] = useState(false);
  const [select, setSelect] = useState("");

  const fullname = `${select.firstname} ${select.lastname}`;

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
          <Typography sx={{ flexGrow: 1 }}>{selected[row].email}</Typography>
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
          <Button variant="contained" disableElevation>
            Change Role
          </Button>
        </Box>
      ))}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={fullname}
        draggable
        fullScreen={fullScreen}
      >
        <Box>
          <Typography variant="h6">
            Name: {select.firstname} {select.lastname}
          </Typography>
          <Typography variant="h6">Mobile: {select.mobile}</Typography>
          <Typography variant="h6">Role: {select.roles}</Typography>
        </Box>
      </Popup>
    </div>
  );
};

export default SelectedUsers;
