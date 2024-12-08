import React, { useEffect, useMemo, useState } from "react";
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
import { uploadImageToCloudinary } from "../../api/uploadApi";
import { DialogImg } from "../Dashboard/styles";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For showing image preview
  const [loading, setLoading] = useState<boolean>(false); // For tracking loading state

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

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        const imageUrl = await uploadImageToCloudinary(file);
        setImagePreview(imageUrl);
        const updatedRowData = { ...newRowData, img: imagePreview };
        setNewRowData(updatedRowData);

        const simulatedEvent = {
          target: {
            name: "img",
            value: imageUrl || "",
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onFieldChange(simulatedEvent);
      } catch (error) {
        console.error("Error uploading image", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    setImagePreview(null);
    onSave();
  };

  const handleCancel = async () => {
    setImagePreview(null);
    onCancel();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>
        {DASHBOARD.CREATE_DIALOG.TITLE} {collection?.slice(0, -1)}
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

        <>
          <input type="file" onChange={handleImageChange} />
          {loading ? (
            <CircularProgress />
          ) : (
            imagePreview && (
              <div>
                <DialogImg
                  src={imagePreview}
                  alt="Image preview"
                  
                />
              </div>
            )
          )}
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          {DASHBOARD.CREATE_DIALOG.CANCEL}
        </Button>
        <Button onClick={handleSave} color="primary" disabled={!isFormValid}>
          {DASHBOARD.CREATE_DIALOG.CREATE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDialog;
