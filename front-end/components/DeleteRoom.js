import { Button } from "@mui/material";
import { mutate } from "swr";
import api from "../axios";

const DeleteRoom = ({ setOpenDeletePopup, deletableRow }) => {
  const { roomNumber, id } = deletableRow;
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <p style={{ fontWeight: "bold", color: "#565656", marginTop: 25 }}>
        Are you sure, you want to delete {roomNumber} room?
      </p>
      <div
        style={{
          marginTop: 35,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          gap: 30,
        }}
      >
        <Button
          disableElevation
          variant="contained"
          color="error"
          onClick={() => {
            api
              .delete(`/room/delete/${id}`)
              .then((res) => {
                if (res.status === 200) {
                  mutate("/room");
                  setOpenDeletePopup(false);
                }
                console.log(res);
              })
              .catch((error) => {
                if (error) {
                  console.log(error);
                }
              });
          }}
        >
          Yes
        </Button>
        <Button
          disableElevation
          variant="contained"
          onClick={() => setOpenDeletePopup(false)}
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default DeleteRoom;
