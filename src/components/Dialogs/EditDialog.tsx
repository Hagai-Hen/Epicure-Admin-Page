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
import { uploadImageToCloudinary } from "../../api/uploadApi";
import { DialogImg, UploadButton, UploadInput } from "../Dashboard/styles";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rateValid, setRateValid] = useState<boolean>(true);
  const [priceValid, setPriceValid] = useState<boolean>(true);

  useEffect(() => {
    setImagePreview(editedRowData.img);
  }, [editedRowData]);

  const handleCancel = () => {
    setRateValid(true);
    setPriceValid(true);
    onCancel();
  }

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

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "rate") {
      const rateValue = Number(value);
      if (rateValue >= 1 && rateValue <= 5) {
        setRateValid(true);
      } else {
        setRateValid(false);
      }
    }

    if (name === "price") {
      const priceValue = Number(value);
      if (priceValue > 0) {
        setPriceValid(true);
      } else {
        setPriceValid(false);
      }
    }

    onFieldChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleSave = async () => {
    onSave();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
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
                onChange={handleFieldChange}
                label={headerName}
              >
                {options.map((option: any) => (
                  <MenuItem
                    key={option}
                    value={field === "tags" ? option.id : option}
                  >
                    {multiple ? (
                      <>
                        <Checkbox
                          checked={
                            field === "tags"
                              ? value.includes(option.id)
                              : value.includes(option)
                          }
                        />
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
              onChange={handleFieldChange}
              fullWidth
              margin="normal"
              error={field === "rate" && !rateValid || field === "price" && !priceValid}
              helperText={
                field === "rate" && !rateValid
                  ? "Rate must be between 1 and 5"
                  : field === "price" && !priceValid
                  ? "Price must be a positive number"
                  : ""
              }
            />
          );
        })}

        <>
          <UploadButton htmlFor="file-upload">
            {DASHBOARD.EDIT_DIALOG.CHOOSE}
          </UploadButton>

          <UploadInput
            type="file"
            id="file-upload"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div>
              <DialogImg
                src={imagePreview}
                alt="Image preview"
                style={{ maxWidth: "100px", marginTop: "8px" }}
              />
            </div>
          )}
          {isLoading && <CircularProgress size={20} />}
        </>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {DASHBOARD.EDIT_DIALOG.CANCEL}
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          disabled={!isFormValid || !rateValid || !priceValid || isLoading}
        >
          {DASHBOARD.EDIT_DIALOG.SAVE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
