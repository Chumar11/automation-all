import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface AlertProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Alert({ open, setOpen }: AlertProps) {
  const handleRefreshClick = () => {
    // Reload the current tab
    window.location.reload();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Payment Confirmation"}
      </DialogTitle>
      <DialogContent sx={{ mt: "20px" }}>
        <DialogContentText id="alert-dialog-description">
          If you have completed the payment, click the 'Refresh' button to
          ensure your changes are reflected.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRefreshClick}>Refresh</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
