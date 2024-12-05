import React from "react";
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

interface EditDialogProps {
  open: boolean;
  editedRowData: any;
  columnData: any;
  isFormValid: boolean;
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => void;
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
          const { field, headerName, type, options, multiple } = col;
          if (field === "actions" || field === "id" || field === "chef_name")
            return null;
          const value = editedRowData[field] || [];
          const isList = col.type === "list";
          return isList ? (
            <FormControl fullWidth margin="normal" key={field}>
              <InputLabel>{headerName}</InputLabel>
              <Select
                multiple={multiple}
                name={field}
                value={value}
                onChange={onFieldChange} // Call onFieldChange to update the state
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
