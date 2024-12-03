import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { DASHBOARD } from "../../resources/content";

interface DeleteDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{DASHBOARD.DELETE_DIALOG.TITLE}</DialogTitle>
      <DialogContent>
        <p>{DASHBOARD.DELETE_DIALOG.BODY}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {DASHBOARD.DELETE_DIALOG.CANCEL}
        </Button>
        <Button onClick={onConfirm} color="secondary" variant="contained">
          {DASHBOARD.DELETE_DIALOG.DELETE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
