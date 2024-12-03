import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { DASHBOARD } from "../../resources/content";

interface CreateDialogProps {
  open: boolean;
  newRowData: any;
  columnData: any;
  isFormValid: boolean;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const CreateDialog: React.FC<CreateDialogProps> = ({ open, newRowData, columnData, isFormValid, onFieldChange, onSave, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{DASHBOARD.CREATE_DIALOG.TITLE}</DialogTitle>
      <DialogContent>
        {columnData?.map((col: any) => {
          const { field, headerName, type } = col;
          if (field === "actions") return null;
          const value = newRowData[field] || "";

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
          {DASHBOARD.CREATE_DIALOG.CANCEL}
        </Button>
        <Button onClick={onSave} color="primary" disabled={!isFormValid}>
          {DASHBOARD.CREATE_DIALOG.CREATE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDialog;
