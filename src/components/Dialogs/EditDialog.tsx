import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { DASHBOARD } from "../../resources/content";

interface EditDialogProps {
  open: boolean;
  editedRowData: any;
  columnData: any;
  isFormValid: boolean;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  collection: string | undefined;
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  editedRowData,
  columnData,
  isFormValid,
  onFieldChange,
  onSave,
  onCancel,
  collection,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>
        {DASHBOARD.EDIT_DIALOG.TITLE} {collection?.slice(0, -1)}
      </DialogTitle>
      <DialogContent>
        {columnData?.map((col: any) => {
          const { field, headerName, type } = col;
          if (field === "actions" || field === "id" || field === "chef_name")
            return null;
          const value = editedRowData[field] || "";

          return (
            <TextField
              key={field}
              label={headerName}
              name={field}
              type={type || "text"}
              value={value}
              onChange={onFieldChange}
              fullWidth
              margin="normal"
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {DASHBOARD.EDIT_DIALOG.CANCEL}
        </Button>
        <Button onClick={onSave} color="primary" disabled={!isFormValid}>
          {DASHBOARD.EDIT_DIALOG.SAVE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
