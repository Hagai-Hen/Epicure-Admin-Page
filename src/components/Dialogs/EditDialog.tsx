import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { DASHBOARD } from "../../resources/content";
import { uploadImageToCloudinary } from '../../api/uploadApi';
import { DialogImg } from "../Dashboard/styles";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For showing image preview
  const [isLoading, setIsLoading] = useState(false); // For showing the loading spinner

  useEffect(() => {
    if (editedRowData.img) {
      setImagePreview(editedRowData.img);
    }
  }, [open, editedRowData]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);

      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setImagePreview(imageUrl);
        if (imageUrl) {
          editedRowData.img = imageUrl;
        }
        onFieldChange({
          target: { name: "img", value: imageUrl },
        } as React.ChangeEvent<HTMLInputElement>);
      } catch (error) {
        console.error("Error uploading image", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    onSave();
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>
        {DASHBOARD.EDIT_DIALOG.TITLE} {collection?.slice(0, -1)}
      </DialogTitle>
      <DialogContent>
        {columnData?.map((col: any) => {
          const { field, headerName, type, options, multiple } = col;
          if (
            field === "actions" ||
            field === "id" ||
            field === "chef_name" ||
            field === "img"
          )
            return null;
          const value = editedRowData[field] || (multiple ? [] : "");
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

        <>
          <input type="file" onChange={handleImageChange} />
          {imagePreview && (
            <div>
              <DialogImg
                src={imagePreview}
                alt="Image preview"
                style={{ maxWidth: "100px", marginTop: "8px" }}
              />
            </div>
          )}
          {isLoading && <CircularProgress size={24} />}
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {DASHBOARD.EDIT_DIALOG.CANCEL}
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          disabled={!isFormValid || isLoading}
        >
          {DASHBOARD.EDIT_DIALOG.SAVE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
