import { Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import router from "next/router";
import { useState } from "react";
import { formatDuration, intervalToDuration } from "date-fns";

const SelectedOrders = ({ selectionModel, rows }) => {
  const selected = rows.filter((row) => selectionModel.includes(row.id));
  const [select, setSelect] = useState("");

  console.log(selected);

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
          <Typography sx={{ marginRight: 6 }}>
            <span style={{ fontWeight: "bold" }}>CheckIn: </span>
            {selected[row].checkIn}
          </Typography>
          {console.log(
            formatDuration(
              intervalToDuration({
                start: new Date(selected[row].checkIn),
                end: new Date(selected[row].checkOut),
              })
            )
          )}
          <Typography sx={{ marginRight: 6 }}>
            <span style={{ fontWeight: "bold" }}>CheckOut: </span>
            {selected[row].checkOut}
          </Typography>
          <Typography sx={{ flexGrow: 1 }}>
            <span style={{ fontWeight: "bold" }}>Status: </span>
            {selected[row].status}
          </Typography>

          <Button
            variant="contained"
            target="_blank"
            href={`/admin/orders/${selected[row].id}`}
            // onClick={() => {
            //   router.push(`/admin/orders/${selected[row].id}`);
            // }}
            disableElevation
          >
            Handle
          </Button>
        </Box>
      ))}
    </div>
  );
};

export default SelectedOrders;
