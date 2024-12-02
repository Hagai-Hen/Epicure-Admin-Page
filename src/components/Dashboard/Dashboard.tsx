import { DashboardContainer } from "./styles";
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

interface Column extends Omit<GridColDef, "renderCell"> {
  renderCell?: (params: any) => JSX.Element;
}

interface SideBarProps {
  data: RowData[];
  setActivePage: (page: string) => void;
  columnData: Column[];
  pageName: string;
}

interface RowData {
  id: string;
}

export const Dashboard = ({
  data,
  setActivePage,
  columnData,
  pageName,
}: SideBarProps) => {
  const [rowsData, setRowsData] = useState<RowData[]>(data);
  const [editingRow, setEditingRow] = useState<RowData | null>(null);
  const [editedRowData, setEditedRowData] = useState<RowData | any>({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<RowData | null>(null);
  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    setActivePage(pageName);
    setRowsData(data);
  }, [pageName]);

  const handleDelete = (id: string) => {
    const row = rowsData.find((row) => row.id === id);
    if (row) setRowToDelete(row);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (rowToDelete) {
      setRowsData((prevRows) =>
        prevRows.filter((row) => row.id !== rowToDelete.id)
      );
      setRowToDelete(null);
    }
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setRowToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleEdit = (row: RowData) => {
    setEditingRow(row);
    setEditedRowData({ ...row });
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedRowData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    const updatedRows = rowsData.map((row) =>
      row.id === editingRow?.id ? { ...row, ...editedRowData } : row
    );
    setRowsData(updatedRows);
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

  return (
    <>
      <DashboardContainer>
        <Paper sx={{ height: 400, width: "80%" }}>
          <DataGrid
            rows={rowsData}
            columns={updatedColumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </DashboardContainer>

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
          <Button onClick={handleSaveEdit} color="primary">
            {DASHBOARD.EDIT_DIALOG.SAVE}
          </Button>
        </DialogActions>
      </Dialog>

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
