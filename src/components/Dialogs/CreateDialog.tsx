import React, { useEffect, useMemo } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
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
  collection: string | undefined;
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
  collection,
}) => {
  const initializedRowData = useMemo(() => {
    if (!open) return {};

    return columnData?.reduce((acc: any, col: any) => {
      if (
        col.field !== "actions" &&
        col.field !== "id" &&
        col.field !== "chef_name"
      ) {
        acc[col.field] = [];
      }
      return acc;
    }, {});
  }, [open, columnData]);

  useEffect(() => {
    setNewRowData(initializedRowData);
  }, [initializedRowData]);

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>
        {DASHBOARD.CREATE_DIALOG.TITLE} {collection?.slice(0, -1)}
      </DialogTitle>
      <DialogContent>
        {columnData?.map((col: any) => {
          const { field, headerName, type, options, multiple } = col;
          if (field === "actions" || field === "id" || field === "chef_name")
            return null;
          const value = newRowData[field] || [];
          const isList = col.type === "list";

          return isList ? (
            <FormControl fullWidth margin="normal" key={field}>
              <InputLabel>{headerName}</InputLabel>
              <Select
                multiple={multiple}
                name={field}
                value={value}
                onChange={onFieldChange}
                label={headerName}
              >
                {options.map((option: any) => (
                  <MenuItem key={option.id} value={option.id}>
                  {multiple ? (
                    <>
                      <Checkbox checked={value.includes(option.id)} />
                      <ListItemText primary={option.name} />
                    </>
                  ) : (
                    <ListItemText primary={option.name} />
                  )}
                </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
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
