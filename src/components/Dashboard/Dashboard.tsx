import {
  DashboardBackContainer,
  DashboardBackIcon,
  DashboardContainer,
  DashboardCreateButton,
  DashboardHeaderBack,
  DashboardHeaderContainer,
  DashboardHeaderEntries,
  DashboardHeaderTitle,
  DashboardLeftHeader,
  DashboardRightHeader,
} from "./styles";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { renderActionsCell } from "./columns";
import { DASHBOARD } from "../../resources/content";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
} from "../../redux/slices/restaurantsSlice";
import {
  createChef,
  deleteChef,
  updateChef,
} from "../../redux/slices/chefsSlice";
import {
  createDish,
  deleteDish,
  updateDish,
} from "../../redux/slices/dishesSlice";

interface Column extends Omit<GridColDef, "renderCell"> {
  renderCell?: (params: any) => JSX.Element;
}

interface DashboardProps {
  data: any[]; // Can be restaurants, chefs, or dishes
  setActivePage: (page: string) => void;
  columnData: Column[];
  pageName: string;
}

export const Dashboard = ({
  data,
  setActivePage,
  columnData,
  pageName,
}: DashboardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [editedRowData, setEditedRowData] = useState<any>({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<any | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newRowData, setNewRowData] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditFormValid, setIsEditFormValid] = useState(true);

  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    setActivePage(pageName);
  }, [pageName]);

  useEffect(() => {
    const initialRowData = columnData.reduce((acc: any, col: Column) => {
      if (col.field !== "actions") {
        acc[col.field] = "";
      }
      return acc;
    }, {});
    setNewRowData(initialRowData);
  }, [columnData]);

  const handleCreateDialogOpen = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedRowData = { ...newRowData, [name]: value };
    setNewRowData(updatedRowData);

    const isValid = Object.values(updatedRowData).every((val) => val !== "");
    setIsFormValid(isValid);
  };

  const handleSaveCreate = () => {
    const newRow = { id: `${data.length + 1}`, ...newRowData };
    switch (pageName) {
      case "restaurants":
        dispatch(createRestaurant(newRow));
        break;
      case "chefs":
        dispatch(createChef(newRow));
        break;
      case "dishes":
        dispatch(createDish(newRow));
        break;
    }
    setNewRowData({});
    setOpenCreateDialog(false);
  };

  const handleCancelCreate = () => {
    setNewRowData({});
    setOpenCreateDialog(false);
    setIsFormValid(false);
  };

  const handleDelete = (id: string) => {
    const row = data.find((row: any) => row.id === id);
    if (row) setRowToDelete(row);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (rowToDelete) {
      switch (pageName) {
        case "restaurants":
          dispatch(deleteRestaurant(rowToDelete.id));
          break;
        case "chefs":
          dispatch(deleteChef(rowToDelete.id));
          break;
        case "dishes":
          dispatch(deleteDish(rowToDelete.id));
          break;
      }
      setRowToDelete(null);
    }
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setRowToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleEdit = (row: any) => {
    setEditingRow(row);
    setEditedRowData({ ...row });
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedRowData((prev: any) => {
      const updated = { ...prev, [name]: value };
      const isValid = Object.values(updated).every((val) => val !== "");
      setIsEditFormValid(isValid);
      return updated;
    });
  };

  const handleSaveEdit = () => {
    switch (pageName) {
      case "restaurants":
        dispatch(updateRestaurant(editedRowData));
        break;
      case "chefs":
        dispatch(updateChef(editedRowData));
        break;
      case "dishes":
        dispatch(updateDish(editedRowData));
        break;
    }
    setEditingRow(null);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
  };

  const gridOptions = {
    handleEdit,
    handleDelete,
  };

  const updatedColumns = columnData.map((col) => {
    if (col.field === "actions") {
      return {
        ...col,
        renderCell: (params: any) =>
          renderActionsCell({ ...params, api: { gridOptions } }),
      };
    }
    return col;
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <DashboardContainer>
        <DashboardHeaderContainer>
          <DashboardLeftHeader>
            <DashboardBackContainer onClick={handleBackClick}>
              <DashboardBackIcon />
              <DashboardHeaderBack>{DASHBOARD.HEADER.BACK}</DashboardHeaderBack>
            </DashboardBackContainer>
            <DashboardHeaderTitle>
              {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
            </DashboardHeaderTitle>
            <DashboardHeaderEntries>
              {data.length} {DASHBOARD.HEADER.ENTRIES}
            </DashboardHeaderEntries>
          </DashboardLeftHeader>
          <DashboardRightHeader>
            <DashboardCreateButton onClick={handleCreateDialogOpen}>
              {DASHBOARD.HEADER.CREATE_BUTTON}
            </DashboardCreateButton>
          </DashboardRightHeader>
        </DashboardHeaderContainer>
        <Paper sx={{ height: "50%", width: "90%" }}>
          <DataGrid
            rows={data}
            columns={updatedColumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </DashboardContainer>

      {/* Create Dialog */}
      <Dialog open={openCreateDialog} onClose={handleCancelCreate}>
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
                onChange={handleCreateFieldChange}
                fullWidth
                margin="normal"
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelCreate} color="primary">
            {DASHBOARD.CREATE_DIALOG.CANCEL}
          </Button>
          <Button
            onClick={handleSaveCreate}
            color="primary"
            disabled={!isFormValid}
          >
            {DASHBOARD.CREATE_DIALOG.CREATE}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editingRow !== null} onClose={handleCancelEdit}>
        <DialogTitle>{DASHBOARD.EDIT_DIALOG.TITLE}</DialogTitle>
        <DialogContent>
          {columnData?.map((col: any) => {
            const { field, headerName, type } = col;
            if (field === "actions") return null;
            const value = editedRowData[field] || "";

            return (
              <TextField
                key={field}
                label={headerName}
                name={field}
                type={type || "text"}
                value={value}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            {DASHBOARD.EDIT_DIALOG.CANCEL}
          </Button>
          <Button
            onClick={handleSaveEdit}
            color="primary"
            disabled={!isEditFormValid}
          >
            {DASHBOARD.EDIT_DIALOG.SAVE}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>{DASHBOARD.DELETE_DIALOG.TITLE}</DialogTitle>
        <DialogContent>
          <p>{DASHBOARD.DELETE_DIALOG.BODY}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            {DASHBOARD.DELETE_DIALOG.CANCEL}
          </Button>
          <Button onClick={confirmDelete} color="secondary" variant="contained">
            {DASHBOARD.DELETE_DIALOG.DELETE}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
