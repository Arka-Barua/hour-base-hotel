import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";

const Popup = (props) => {
  const {
    title,
    children,
    openPopup,
    setOpenPopup,
    TransitionComponent,
    fullScreen,
  } = props;
  return (
    <Dialog
      open={openPopup}
      fullWidth
      fullScreen={fullScreen}
      TransitionComponent={TransitionComponent}
    >
      <DialogTitle>
        <Box style={{ display: "flex" }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            {title}
          </Typography>
          <Button
            disableElevation
            variant="contained"
            color="error"
            onClick={() => setOpenPopup(false)}
          >
            x
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
