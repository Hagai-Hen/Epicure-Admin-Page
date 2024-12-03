import React, { useEffect, useMemo } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { DASHBOARD } from "../../resources/content";

interface CreateDialogProps {
  open: boolean;
  newRowData: any;
  columnData: any;
  isFormValid: boolean;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  setNewRowData: (row: string) => void;
}

const CreateDialog: React.FC<CreateDialogProps> = ({
  open,
  newRowData,
  columnData,
  isFormValid,
  onFieldChange,
  onSave,
  onCancel,
  setNewRowData,
}) => {
  const initializedRowData = useMemo(() => {
    if (!open) return {};

    return columnData?.reduce((acc: any, col: any) => {
      if (col.field !== "actions") {
        acc[col.field] = "";
      }
      return acc;
    }, {});
  }, [open, columnData]);

  useEffect(() => {
    setNewRowData(initializedRowData);
  }, [initializedRowData]);

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
